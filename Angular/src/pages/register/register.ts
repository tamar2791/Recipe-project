import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, ReactiveFormsModule, CommonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm!: FormGroup;
  errorMessage: string = '';

  ngOnInit(): void {
    let email = '';
    let password = '';
    
    if (typeof window !== 'undefined' && window.sessionStorage) {
      email = sessionStorage.getItem('registerEmail') || '';
      password = sessionStorage.getItem('registerPassword') || '';
    }

    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: [email, [Validators.required, Validators.email]],
      password: [password, [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const userData = this.registerForm.value;
    this.userService.signup(userData).subscribe({
      next: (res) => {
        this.authService.setUser({
          username: res.name,
          userId: res.role,
          token: res.token
        });
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        if (err.status === 0) {
          this.errorMessage = 'שגיאת רשת, אנא נסה שוב מאוחר יותר';
          return;
        }
        if (err.status === 500 && err.error?.error?.includes('duplicate key')) {
          this.errorMessage = 'משתמש עם כתובת דוא"ל זו כבר קיים';
          return;
        }
        if (err.status === 500) {
          this.errorMessage = 'שגיאה פנימית בשרת, אנא נסה שוב';
          return;
        }
        this.errorMessage = err.error?.message || 'שגיאה בעת ההרשמה';
      }
    });
  }
}
