import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'user';

  private userSubject = new BehaviorSubject<{ username: string; userId: string; token: string } | null>(this.getUser());
  user$ = this.userSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setUser(user: { username: string; userId: string; token: string }) {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
    this.userSubject.next(user);
  }

  getUser(): { username: string; userId: string; token: string } | null {
    if (!this.isBrowser()) {
      return null;
    }
    const userJson = localStorage.getItem(this.storageKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  getToken(): string | null {
    return this.getUser()?.token || null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser() && !this.isTokenExpired();
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.storageKey);
    }
    this.userSubject.next(null);
  }

  isTokenExpired(): boolean {
    const user = this.getUser();
    if (!user?.token) return true;

    try {
      const payload = JSON.parse(atob(user.token.split('.')[1]));
      const exp = payload.exp;
      return Math.floor(Date.now() / 1000) >= exp;
    } catch (e) {
      return true;
    }
  }
}
