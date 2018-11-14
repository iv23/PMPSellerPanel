import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string;
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json') };
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.apiURL}${path}`, { params });
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.apiURL}${path}`,
      JSON.stringify(body), this.options);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${this.apiURL}${path}`,
      JSON.stringify(body), this.options);
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.apiURL}${path}`);
  }
}
