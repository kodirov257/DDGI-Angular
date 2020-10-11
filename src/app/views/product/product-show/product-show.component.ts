import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ProductService } from '@app/utils/services';
import { Product, ProductField } from '@app/utils/models';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss']
})
export class ProductShowComponent implements OnInit {
  id: number;

  product: Product;
  productFields: ProductField[];

  constructor(
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
       this.id = +params.id;

       this.getProduct(this.id);
    });
  }

  onDelete(): void {
    this.productService
      .delete(this.id)
      .subscribe(data => {
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.product = data.data;
          this.toastr.success('Deleted', 'successfully');
          this.router.navigate(['products']);
        }
      }, error => {
          this.toastr.error(error);
      }
    );
  }

  sortProductField(field_id: number, sort: string): void {
    this.productService
      .sortProductField(field_id, sort)
      .subscribe(data => {
        this.product = data.data;
    });
  }

  getProduct(id: number): void {
    this.productService
      .getProduct(id)
      .subscribe(data => {
        this.product = data.data;
    });
  }

  getProductFields(id: number): void {
    this.productService
      .getProductFields(id)
      .subscribe(data => {
        this.productFields = data.data;
    });
  }

}
