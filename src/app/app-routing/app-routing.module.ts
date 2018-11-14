import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from '../layout/layout.component';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';
import {ProductsComponent} from '../products/products.component';
import {AddProductComponent} from '../add-product/add-product.component';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {EditProductComponent} from '../edit-product/edit-product.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/#/',
    pathMatch: 'full'
  },
  {
    path: '#',
    component: LayoutComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'myProducts',
    component: ProductsComponent
  },
  {
    path: 'addProduct',
    component: AddProductComponent
  },
  {
    path: 'product/:productId',
    component: ProductDetailComponent
  },
  {
    path: 'edit/:productId',
    component: EditProductComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
