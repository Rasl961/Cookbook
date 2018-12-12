import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null;
  public isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  loginUser(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:3000/api/auth/login', user)
      .pipe(
        tap(
          ({ token }) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
            this.isAuthenticated = true;
          }
        )
      );
  }

  registerUser(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:3000/api/auth/register', user);
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAthenticated(): boolean {
    return !!this.token;
  }

  logOut() {
    this.setToken(null);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
