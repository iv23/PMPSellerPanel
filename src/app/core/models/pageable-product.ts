import {Product} from './product.model';
import {Pageable} from './pageable.model';
import {Sort} from './sort.model';

export interface PageableProduct {
  content: Product[];
  pageable: Pageable;
  totalPages: number;
  last: boolean;
  totalElements: number;
  size: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
}
