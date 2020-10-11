import {Product} from '@app/utils/models/product';

export class ProductField {
  id: number;
  product_id: number;
  name: string;
  type: number;
  default?: string;
  variants?: string;
  required: boolean;
  order?: number;
  product?: Product;
}
