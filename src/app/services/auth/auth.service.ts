import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, User } from '../../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth';
  private tokenKey = 'access';

  constructor(private http: HttpClient) {}

  register(data: Partial<User> & { password: string; password2: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register/`, data);
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, credentials).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.access);
        localStorage.setItem('refresh', res.refresh);
      })
    );
  }

  getProfile(): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get<User>(`${this.apiUrl}/dashboard/`, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
     localStorage.removeItem('refresh');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
