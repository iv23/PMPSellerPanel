import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageDownloadService {
  constructor(private _http: HttpClient) {

  }

  downloadFile(route: string) {
    return this._http.get(route, { responseType: 'text' });
  }
}
