import {Component, Input, OnInit} from '@angular/core';
import {Product, Seller} from '../../core/models';
import {ImageDownloadService, UserService} from '../../core/services';
import {HttpHeaders} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent implements OnInit {
  @Input() product: Product;
  seller: Seller;
  primaryImage;
  constructor(private _user: UserService, private _image: ImageDownloadService, private _sanitizer: DomSanitizer,
              private _router: Router) {

  }

  ngOnInit() {
    this.seller = this._user.getCurrentSeller();
    if (this.product.primaryImagePath !== null) {
      this._image.downloadFile(this.product.primaryImagePath).subscribe( data => {
        this.primaryImage = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + data);
      });
    }
    console.log(this.primaryImage);
  }

  viewClicked() {
    this._router.navigate(['/product/' + this.product.productId]);
  }

  editClicked() {
    this._router.navigate(['/edit/' + this.product.productId]);
  }
}
