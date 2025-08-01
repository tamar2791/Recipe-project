import { inject } from "@angular/core";
import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../shared/services/auth.service";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { error } from "console";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService); //inject במקום בנאי שימוש ב 
    const token = authService.getToken(); // אם קיים הטוקן, הוא יוחזר כאן
    const router = inject(Router);

    let clonedReq = req;

    // אם יש טוקן, נוסיף אותו לכותרת Authorization של הבקשה
    if (token) {
        clonedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}` // הוספת הטוקן לכותרת Authorization
            }
        });
    }
    return next(clonedReq).pipe(// שולח את הבקשה עם הטוקן
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401 && !req.url.includes('/my-recipes')) {
                // במידה והטוקן לא תקף או פג תוקף (אבל לא בבקשות למתכונים שלי)
                console.log('Token expired or unauthorized, logging out...')
                authService.logout() // מנקה את ה localStorage
                router.navigate(['/login'], { queryParams: { expired: 'true' } });
            }
            return throwError(() => error)
        })
    )
    // אם אין טוקן, נמשיך עם הבקשה המקורית
}
