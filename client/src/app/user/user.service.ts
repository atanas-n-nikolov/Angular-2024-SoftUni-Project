import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user';
import { Animals } from '../types/animal';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<User | null>(null);
  public user$ = this.user$$.asObservable();

  user: User | null = null;
  userSubscription: Subscription | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    const storeUser = localStorage.getItem('user');

    if (storeUser) {
      this.user = JSON.parse(storeUser);
      this.user$$.next(this.user);
    }

    this.userSubscription = this.user$.subscribe((user) => {
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
      .pipe(
        tap(() => {
          this.login(email, password).subscribe();
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(
        '/api/users/login',
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((user) => {
          if (user) {
            const UserData = {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              _id: user._id
            };
            localStorage.setItem('user', JSON.stringify(UserData));
            this.user$$.next(user);
          }
        })
      );
  }

  logout() {
    return this.http.post('/api/users/logout', {}).pipe(
      tap((user) => {
        localStorage.removeItem('user');
        this.user$$.next(null);
      })
    );
  }

  getProfile() {
    return this.http.get<User>('/api/users/profile').pipe(
      tap((user) => {
        this.user$$.next(user);
      })
    );
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
          const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            _id: user._id
          };
          this.user$$.next(user);
          localStorage.setItem('user', JSON.stringify(userData));
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

  removeLike(animalId: string, userId: string) {
    return this.http.post(`/api/animals/${animalId}/unlike`, {userId});
  }

  addLike(animalId: string, userId: string) {
    return this.http.post(`/api/animals/${animalId}/like`, {userId});
  }
}
