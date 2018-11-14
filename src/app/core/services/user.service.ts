import { Injectable } from '@angular/core';
import {Seller} from '../models';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private sellerDataSubject: BehaviorSubject<Seller> = new BehaviorSubject<Seller>({} as Seller);
  public sellerData: Observable<Seller> = this.sellerDataSubject.asObservable().pipe(distinctUntilChanged());
  public isLoggedInSubject: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
  public isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable().pipe(distinctUntilChanged());
  constructor() { }

  loginUser(seller: Seller) {
    this.sellerDataSubject.next(seller);
    this.isLoggedInSubject.next(true);
  }
  logoutUser() {
    this.sellerDataSubject.next({} as Seller);
    this.isLoggedInSubject.next(false);
  }
  getCurrentSeller(): Seller {
    return this.sellerDataSubject.value;
  }
  getLoginStatus(): boolean {
    return this.isLoggedInSubject.value;
  }
}
