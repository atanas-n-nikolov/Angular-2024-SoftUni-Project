import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, Subscription, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserWithToken } from '../types/user';
import { Animals } from '../types/animal';
import { Router } from '@angular/router';

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
    const storeUser = localStorage.getItem('user')

    if(storeUser) {
      const userWithToken: UserWithToken = JSON.parse(storeUser);
      const {token, ...userWithoutToken} = userWithToken;
      this.user = userWithoutToken;
      this.user$$.next(this.user);
    };

    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  };

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
    return this.http.post<UserWithToken>('/api/users/login', {email, password}, {withCredentials: true}).pipe((tap((UserWithToken) => {
      localStorage.setItem('user', JSON.stringify(UserWithToken));
      const { token, ...userWithoutToken } = UserWithToken;
      this.user$$.next(userWithoutToken);
    })))
  }

  logout() {
    return this.http.post('/api/users/logout', {}).pipe(tap((user) => {
      localStorage.removeItem('user');
      this.user$$.next(null);
    }))
  }

  getProfile() {
    return this.http.get<User>('/api/users/profile').pipe(tap((user) => {
      this.user$$.next(user)
    }))
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

  removeLike(animalId: string, userId: string) {
    return this.http.post(`/api/animals/${animalId}/like`, {animalId, userId})
  }

  addLike(animalId: string, userId: string) {
    return this.http.post(`/api/animals/${animalId}/like`, {animalId, userId})
  }
}
