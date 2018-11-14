import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category, Product} from '../core/models';
import {ImagePath} from '../core/models/image-path.model';
import {FilePath} from '../core/models/file-path.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiService, UserService} from '../core/services';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {ProductService} from '../products/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  productData: Product;
  productReqObj: Product ;
  additionalFiles: string[] = [];
  imagePaths: ImagePath[];
  additionalImagesPath: FilePath[];
  categoriesObservable: Observable<any>;
  categories: Category[];
  primaryImagePath: FilePath;
  usageInstrPath: FilePath;
  selectedCategoryValues = [];
  productRes: Product;
  productId: number;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder, private _http: HttpClient, private _user: UserService, private _api: ApiService,
              private router: Router, private route: ActivatedRoute, private _product: ProductService) {
    this.productReqObj = {} as Product;
    this.imagePaths = null;
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
      this._product.getProduct(this.productId).subscribe(product => {
        this.productData = product;
        this.categoriesObservable = this._api.get('/categories').pipe(
          tap((data: Category[]) => {
            this.categories = data;
            this.createForm();
            this.productForm.patchValue(this.productData);
          })
        );
      });
    });
  }

  ngOnInit() {
  }

  addCategoryControls() {
    const arr = this.categories.map(element => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }

  onFileSelected(formField, event) {
    if (formField !== 'additionalImages') {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.productForm.get(formField).setValue(file);
      }
    } else {
      if (event.target.files.length > 0) {
        for (let i = 0; i < event.target.files.length; i++) {
          this.additionalFiles.push(event.target.files[i]);
        }
        this.productForm.get(formField).setValue(this.additionalFiles);
      }
    }

  }
  createForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productCode: ['', Validators.required],
      mrp: ['', Validators.required],
      ssp: [''],
      ymp: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: [''],
      primaryImage: null,
      usageInstructions: null,
      additionalImages: null,
      dimensions: [''],
      categories: this.addCategoryControls()
    });
  }

  get categoriesArray() {
    return <FormArray>this.productForm.get('categories');
  }

  getSelectedCategoryValues() {
    this.selectedCategoryValues = [];
    this.categoriesArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedCategoryValues.push(this.categories[i]);
      }
    });
    console.log(this.selectedCategoryValues);
  }

  async addProductTapped() {

    const input = new FormData();
    input.append('file', this.productForm.get('primaryImage').value);
    this.primaryImagePath = await this._http.post<FilePath>('http://localhost:8080/uploadFile', input).toPromise();
    console.log(this.primaryImagePath);
    this.productReqObj.primaryImagePath = this.primaryImagePath.filePath;

    const input2 = new FormData();
    input2.append('file', this.productForm.get('usageInstructions').value);
    this.usageInstrPath = await this._http.post<FilePath>('http://localhost:8080/uploadFile', input2).toPromise();
    this.productReqObj.usageInstrPath = this.usageInstrPath.filePath;

    const input3 = new FormData();
    for (let i = 0; i < this.additionalFiles.length; i++) {
      input3.append('files', this.additionalFiles[i]);
    }
    this.additionalImagesPath = await this._http.post<FilePath[]>('http://localhost:8080/uploadMultipleFiles', input3).toPromise();

    if (this.selectedCategoryValues !== null) {
      this.productReqObj.categories = this.selectedCategoryValues;
    }
    this.productReqObj.productCode = this.productForm.get('productCode').value;
    this.productReqObj.productName = this.productForm.get('productName').value;
    this.productReqObj.mrp = this.productForm.get('mrp').value;
    this.productReqObj.ssp = this.productForm.get('ssp').value;
    this.productReqObj.ssp = this.productForm.get('ssp').value;
    this.productReqObj.longDescription = this.productForm.get('longDescription').value;
    this.productReqObj.shortDescription = this.productForm.get('shortDescription').value;
    this.productReqObj.ymp = this.productForm.get('ymp').value;
    this.productReqObj.dimensions = this.productForm.get('dimensions').value;
    console.log(JSON.stringify(this.productReqObj));
    this.productRes = await (this._api
      .put('/sellers/' + this._user.getCurrentSeller().sellerId + '/products', this.productReqObj)
      .toPromise() as Promise<Product>);
    this.imagePaths = [];
    for (let i = 0; i < this.additionalImagesPath.length; i++) {
      this.imagePaths.push({imagePath:  this.additionalImagesPath[i].filePath, productId: null, imageId: null});
    }
    this.productRes.imagePaths = this.imagePaths;
    this._api
      .put('/sellers/' + this._user.getCurrentSeller().sellerId + '/products/' + this.productRes.productId + '/images', this.imagePaths)
      .subscribe((data) => {
        this.productRes.imagePaths = data;
        this.router.navigate([''], {relativeTo: this.route});
      });
  }

}
