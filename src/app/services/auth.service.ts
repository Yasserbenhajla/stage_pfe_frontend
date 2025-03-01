import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:8080/api/v1/auth';

    constructor(private http: HttpClient, private router: Router) {}


    login(credentials: { email: string; password: string }): Observable<{ token: string; role: string }> {
      return this.http.post<{ token: string; role: string }>(`${this.apiUrl}/login`, credentials).pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.redirectUser(response.role);
        })
      );
    }


    // Get the stored role
    getUserRole(): string | null {
      return localStorage.getItem('role');
    }

    // Check if user is authenticated
    isAuthenticated(): boolean {
      return !!localStorage.getItem('token');
    }

    // Redirect user based on role
    private redirectUser(role: string) {
      if (role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else if (role === 'USER') {
        this.router.navigate(['/user']);
      } else {
        this.router.navigate(['/login']);
      }
    }

    // Logout function
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
    }
  }
