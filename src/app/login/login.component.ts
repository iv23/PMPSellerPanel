import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginMessage: string;
  constructor(private formBuilder: FormBuilder, private _login: LoginService, private _user: UserService,
              private router: ActivatedRoute, private route: Router) {
    this.loginForm = this.formBuilder.group({
      sellerId: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  signInTapped() {
    if (this.loginForm.valid) {
      const sellerCred = {
        sellerId: this.loginForm.value.sellerId,
        password: this.loginForm.value.password
      };
      this._login.loginSeller(sellerCred)
        .subscribe(
          res => {
            if (res === null) {
              this.loginMessage = 'Incorrect login credentials for seller.';
              this.loginMessage = this.loginMessage + ' Please try different seller id and password or try signing up if not registered.';
            } else {
              if (res.status === 'APPROVED') {
                this._user.loginUser(res);
                console.log(this._user.getCurrentSeller());
                this.route.navigate([''], {relativeTo: this.router});
              } else if (res.status === 'REJECTED') {
                this.loginMessage = 'Your registration has been cancelled please contact YourMart services team.';
              } else if (res.status === 'NEED_APPROVAL') {
                this.loginMessage = 'Your registration hasn\'t been approved yet.';
              }
            }
          }
        );
    }
  }

  ngOnInit() {
  }

}
