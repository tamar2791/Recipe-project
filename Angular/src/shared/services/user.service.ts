import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = `${environment.apiUrl}/user`;


    constructor(private http: HttpClient) { }

    // קבלת כל המשתמשים
    // דורש הרשאות מנהל
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}`);
    }

    // הרשמת משתמש חדש
    signup(userData: Partial<User>): Observable<{ name: string; token: string; role: string }> {
        return this.http.post<{ name: string; token: string; role: string }>(`${this.apiUrl}/register`, userData);
    }

    // התחברות של משתמש קיים
    signin(credentials: { email: string; password: string }): Observable<{ name: string; token: string; role: string }> {
        return this.http.post<{ name: string; token: string; role: string }>(`${this.apiUrl}/login`, credentials);
    }

    // מחיקת משתמש
    // דורש הרשאות מנהל
    deleteUser(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
