import {Address} from './address.model';

export interface Seller {
  sellerId: number;
  companyName: string;
  ownerName: string;
  address: Address;
  email: string;
  telephone: string;
  gstNumber: string;
  password: string;
  status: string;
  updatedAt: number[];
  createdAt: number[];
}
