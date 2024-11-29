import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { User } from '../types/user';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{
  private user$$ = new BehaviorSubject< User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;

  private subscription: Subscription;
  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  }

  register(userData: any): Observable<User> {
    const {apiUrl} = environment;
    let url = `${apiUrl}/users/register`;
    return this.http.post<User>(url, userData).pipe(tap((newUser) => {
      this.setUser(newUser);
    }));
  }


  setUser(user: User): void {
    this.user$$.next(user)
  };

  clearUser(): void {
    this.user$$.next(undefined);
  };

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
