import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../shared/services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    CommonModule, HttpClientModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  loginError = '';

  constructor(private userService: UserService, private router: Router,private authService: AuthService) { }

  onSubmit(form: any) {
    if (form.invalid) {
      return
    }

    this.userService.signin(this.loginData).subscribe({
      next: (res) => {
            console.log('Response from signin:', res); // <--- הוסף את זה כאן!

        this.authService.setUser({
          username: res.name,
          userId: res.role,
          token: res.token,
        });
        // הכניסה הצליחה, ניווט לדף המתכונים
        this.loginError = '';
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        if( err.status === 0) {
          // שגיאת רשת, לדוגמה אם השרת לא זמין
          this.loginError = 'שגיאת רשת, אנא נסה שוב מאוחר יותר';
          return;
        }
        // הכניסה נכשלה, הצגת הודעת שגיאה
        this.loginError = 'שם משתמש או סיסמה שגויים';
      }
    })
  }

  // פונקציה לניווט לדף ההרשמה עם פרטי המשתמש
  goToRegister() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const email = this.loginData?.email || '';
      const password = this.loginData?.password || '';
      sessionStorage.setItem('registerEmail', email);
      sessionStorage.setItem('registerPassword', password);
    }
    this.router.navigate(['/register']);
  }

}
