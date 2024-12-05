import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.user$$.asObservable();
  user: User | undefined;

  private subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });

    this.loadProfile();
  }

  get isLogged(): boolean {
    return !!this.user;
  }

  register(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post<User>('/api/users/register', { firstName, lastName, email, password }).pipe(
      tap(user => this.user$$.next(user))
    );
  }

  login(email: string, password: string) {
    return this.http.post<User>('/api/users/login', { email, password }).pipe(
      tap(user => this.user$$.next(user))
    );
  }

  logout() {
    return this.http.post('/api/users/logout', {}).pipe(
      tap(() => this.user$$.next(undefined))
    );
  }

  loadProfile() {
    return this.http.get<User>('/api/users/profile').pipe(
      tap(user => this.user$$.next(user))
    );
  }

  updateProfile(firstName: string, lastName: string, email: string, userId: string) {
    return this.http.put<User>(`/api/users/profile/${userId}`, {firstName, lastName, email}, {withCredentials: true}).pipe(tap(user => this.user$$.next(user)))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
