import { Component, OnInit } from '@angular/core';
import {Product} from '../core/models';
import {ProductService} from '../products/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productData: Product;
  productId: any;
  constructor(private _product: ProductService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.productId = params['productId'];
      this._product.getProduct(this.productId).subscribe(data => {
        this.productData = data;
      });
    });
  }
}
