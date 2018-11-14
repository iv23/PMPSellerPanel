import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RegisterService} from './register.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Seller} from '../core/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  message: string;
  isRegistered: boolean;

  constructor(private formBuilder: FormBuilder, private _register: RegisterService,
              private router: ActivatedRoute, private route: Router) {
    this.registerForm = this.formBuilder.group({
      companyName: ['', Validators.compose([Validators.required])],
      ownerName: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      address2: ['', Validators.compose([])],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      pinCode: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      telephone: ['', Validators.compose([Validators.required])],
      gstNumber: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
    this.message = '';
    this.isRegistered = false;
  }

  signUpTapped() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const address = {
        address: formData.address,
        address2: formData.address2,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pinCode: formData.pinCode,
      };
      const sellerCred = {
        companyName: formData.companyName,
        ownerName: formData.ownerName,
        address: address,
        email: formData.email,
        telephone: formData.telephone,
        gstNumber: formData.gstNumber,
        password: formData.password
      };
      this._register.registerSeller(sellerCred).subscribe((data: Seller) => {
        this.isRegistered = true;
        this.message = data.sellerId + ' is your seller ID for login. Please do not forget it.';
      });
    }
  }

  ngOnInit() {
  }

}
