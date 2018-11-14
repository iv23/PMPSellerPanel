import { Injectable } from '@angular/core';
import {ApiService} from '../core/services';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  route: string;
  constructor(private apiService: ApiService) {
    this.route = '/sellers/login';
  }
  loginSeller(seller) {
    return this.apiService.post(this.route, seller);
  }
}
