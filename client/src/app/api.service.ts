import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Animals } from './types/animal';
import { HttpClient } from '@angular/common/http';


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

  getAdopt() {
    const {apiUrl} = environment;
    let url = `${apiUrl}/animals/adopt`;

    return this.http.get<Animals[]>(url);
  }

  getLostAndFound() {
    const {apiUrl} = environment;
    let url = `${apiUrl}/animals/lostandfound`;

    return this.http.get<Animals[]>(url);
  }
}
