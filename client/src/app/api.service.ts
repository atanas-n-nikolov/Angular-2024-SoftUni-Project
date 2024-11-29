import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Animals } from './types/animal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './types/user';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLatestAdopt() {
    const {apiUrl} = environment;
    let url = `${apiUrl}/animals/latestAdopt`;

    return this.http.get<Animals[]>(url)
  }

  lostAndFoundLatest() {
    const {apiUrl} = environment;
    let url = `${apiUrl}/animals/latestFound`;

    return this.http.get<Animals[]>(url)
  };

  register(userData: any): Observable<User> {
    const {apiUrl} = environment;
    let url = `${apiUrl}/users/register`;
    return this.http.post<User>(url, userData);
  }
}
