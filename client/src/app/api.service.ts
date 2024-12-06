import { Injectable } from '@angular/core';
import { Animals } from './types/animal';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLatestAdopt() {
    let url = '/api/animals/latestAdopt';

    return this.http.get<Animals[]>(url)
  }

  lostAndFoundLatest() {
    let url = '/api/animals/latestFound';

    return this.http.get<Animals[]>(url)
  };

  getAdopt() {
    let url = '/api/animals/adopt';

    return this.http.get<Animals[]>(url);
  }

  getLostAndFound() {
    let url = '/api/animals/lostandfound';

    return this.http.get<Animals[]>(url);
  }

  getAnimal(id: string) {
    return this.http.get<Animals>(`/api/animals/${id}/details`)
  }
}
