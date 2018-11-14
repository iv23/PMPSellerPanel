import {Component, OnInit} from '@angular/core';
import {Product} from '../core/models';
import {ProductService} from './product.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product>;
  sortForm: FormGroup;
  sortBy = ['PRODUCT CODE', 'PRODUCT NAME', 'MRP', 'SSP', 'YMP'];
  searchBy = ['PRODUCT CODE', 'PRODUCT NAME'];
  page = 0;
  filterForm: FormGroup;
  searchForm: FormGroup;
  filters = ['ALL', 'APPROVED', 'NEW', 'REVIEW', 'REJECTED'];
  filterTypes = ['STATUS'];
  pages: Array<number>;
  searchQuery: string;

  constructor(private _product: ProductService, private _fb: FormBuilder) {
    this.createForms();
    this.searchQuery = '';
    this.getProducts();
  }

  ngOnInit() {
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getProducts();
  }

  createForms() {
    this.filterForm = this._fb.group({
      filterType: [''],
      filterBy: ['']
      }
    );
    this.sortForm = this._fb.group({
      sortBy: [''],
      sortDirection: ['']
      }
    );
    this.searchForm = this._fb.group({
      searchQuery: [''],
      searchBy: ['']
      }
    );
  }

  getProducts() {
    this._product.getProducts(this.page).subscribe(
      data => {
        console.log(data);
        this.products = data['content'];
        this.pages = new Array<number>(data['totalPages']);
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  onFilterTapped() {
    let route;
    route = 'search=' + this.convertToUrlFormat(this.filterForm.get('filterType').value) + ':' + this.filterForm.get('filterBy').value;
    if (this.filterForm.get('filterBy').value === 'ALL') {
      this.getProducts();
    } else {
      this._product.searchProducts(this.page, route).subscribe(
        data => {
          console.log(data);
          this.products = data['content'];
          this.pages = new Array<number>(data['totalPages']);
        },
        error1 => {
          console.log(error1);
        }
      );
    }
  }

  onSearchTapped() {
    let route;
    route = 'search=' + this.convertToUrlFormat(this.searchForm.get('searchBy').value) + ':' + this.searchForm.get('searchQuery').value;
    this._product.searchProducts(this.page, route).subscribe(
      data => {
        console.log(data);
        this.products = data['content'];
        this.pages = new Array<number>(data['totalPages']);
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  onSortTapped() {
    let route;
    route = 'sort=' + this.convertToUrlFormat(this.sortForm.get('sortBy').value) + ',' + this.sortForm.get('sortDirection').value;
    this._product.getProductsSorted(this.page, route).subscribe(
      data => {
        console.log(data);
        this.products = data['content'];
        this.pages = new Array<number>(data['totalPages']);
      },
      error1 => {
        console.log(error1);
      }
    );
  }
  convertToUrlFormat(str: string): string {
    if ( str === 'PRODUCT CODE') {
      return 'productCode';
    } else if (str === 'PRODUCT NAME') {
      return 'productName';
    } else if (str === 'MRP') {
      return 'mrp';
    } else if (str === 'SSP') {
      return 'ssp';
    } else if (str === 'YMP') {
      return 'ymp';
    } else if (str === 'STATUS') {
      return 'status';
    }
  }
}
