import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user';
import { Animals } from '../types/animal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<User | null>(null);
  public user$ = this.user$$.asObservable();
  user: User | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient, private router: Router) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    return this.http
      .post<User>('/api/users/register', {
        firstName,
        lastName,
        email,
        password,
      })
      .pipe(tap(() => {
        this.login(email, password).subscribe();
      }));
  }

  login(email: string, password: string) {
    return this.http
      .post<User>('/api/users/login', { email, password })
      .pipe(tap((user) => {
        this.user$$.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home'])
      }),
    switchMap(() => this.getProfile()));
  }

  logout() {
    return this.http
      .post('/api/users/logout', {})
      .pipe(tap(() => {
        this.user$$.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/home']);
      }));
  }

  getProfile() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if(user) {
      this.user$$.next(user);
      return this.http.get<User>('/api/users/profile', {withCredentials: true}).pipe(tap((user) => this.user$$.next(user)), catchError((error) => {
        if(error.status === 400) {
          this.user$$.next(null)
        }
        throw(error)
      }))
    } else {
      this.user$$.next(null);
      return of(null);
    }
  }

  getUser(): Observable<User | null> {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user) {
    this.user$$.next(user);
    return of(user);
  } else {
    return this.http.get<User>('/api/users/profile', { withCredentials: true }).pipe(
      tap((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user$$.next(user);
      })
    );
  }
  }
  updateProfile(firstName: string, lastName: string, email: string) {
    return this.http
      .put<User>(
        '/api/users/profile',
        { firstName, lastName, email },
        { withCredentials: true }
      )
      .pipe(
        tap((user) => {
          this.user$$.next(user);
        })
      );
  }

  createAnimal(
    status: string,
    name: string,
    type: string,
    age: string,
    size: string,
    gender: string,
    specialNeeds: string,
    location: string,
    image: string,
    description: string
  ) {
    return this.http.post<Animals>(`/api/animals/create`, {
      status,
      name,
      type,
      age,
      size,
      gender,
      specialNeeds,
      location,
      image,
      description,
    });
  }
}
