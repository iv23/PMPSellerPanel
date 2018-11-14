import { Injectable } from '@angular/core';
import {ApiService, UserService} from '../core/services';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL: string;
  sellerId: number;
  size: number;
  constructor(private _api: ApiService, private _user: UserService) {
    this.apiURL = environment.apiURL;
    this.sellerId = this._user.getCurrentSeller().sellerId;
    this.size = 4;
  }

  getProducts(page: number) {
    const route = '/sellers/' + this.sellerId + '/products?page=' + page + '&size=' + this.size;
    return this._api.get(route);
  }
  getProductsSorted(page: number, sortStr: string) {
    const route = '/sellers/' + this.sellerId + '/products?page=' + page + '&size=' + this.size + '&' + sortStr;
    return this._api.get(route);
  }
  searchProducts(page: number, searchStr: string) {
    const route = '/sellers/' + this.sellerId + '/products?page=' + page + '&size=' + this.size + '&' + searchStr;
    return this._api.get(route);
  }

  getProduct(productId) {
    const route = '/sellers/' + this.sellerId + '/products/' + productId;
    return this._api.get(route);
  }
}
