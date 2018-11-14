import { Injectable } from '@angular/core';
import {ApiService} from '../core/services';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  route: string;
  constructor(private apiService: ApiService) {
    this.route = '/sellers/register';
  }
  registerSeller(seller) {
    return this.apiService.post(this.route, seller);
  }
}
