import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject< User | null>(null);
  public user$ = this.user$$.asObservable();
  user: User | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http:HttpClient) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }


  register(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post<User>('/api/users/register', { firstName, lastName, email, password }).pipe(
      tap((user) => this.user$$.next(user))
    );
  }

  login(email: string, password: string) {
    return this.http.post<User>('/api/users/login', { email, password }).pipe(tap((user) => this.user$$.next(user)));
}

  logout() {
    return this.http.post('/api/users/logout', {}).pipe(
      tap(() => this.user$$.next(null))
    );
  }

  getProfile() {
    return this.http.get<User>('/api/users/profile', { withCredentials: true }).pipe(tap((user) => this.user$$.next(user)));
  };

  updateProfile(firstName: string, lastName: string, email: string) {
    return this.http.put<User>('/api/users/profile', {firstName, lastName, email}, { withCredentials: true }).pipe(tap((user) => {
      this.user$$.next(user);
    }))
  }

}
