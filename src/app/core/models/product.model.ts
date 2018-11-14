import {Category} from './category.model';
import {ProductAttribute} from './product-attribute.model';
import {ImagePath} from './image-path.model';

export interface Product {
  productId: number;
  productCode: string;
  productName: string;
  status: string;
  seller: number;
  mrp: number;
  ssp: number;
  ymp: number;
  primaryImagePath: string;
  shortDescription: string;
  longDescription: string;
  usageInstrPath: string;
  dimensions: string;
  comment: string;
  updatedAt: number[];
  createdAt: number[];
  categories: Category[];
  productAttributes: ProductAttribute[];
  imagePaths: ImagePath[];
}
