import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatTabsModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {CoreModule} from './core/core.module';
import {ApiService, UserService} from './core/services';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent  } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {RegisterService} from './register/register.service';
import {LoginService} from './login/login.service';
import { ProductsComponent } from './products/products.component';
import { ProductPreviewComponent } from './products/product-preview/product-preview.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from './products/product.service';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    ProductPreviewComponent,
    AddProductComponent,
    ProductDetailComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbPaginationModule,
    AppRoutingModule
  ],
  providers: [ApiService, RegisterService, LoginService,
              UserService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
