import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ProductFieldService } from '@app/utils/services';
import { Product, ProductField } from '@app/utils/models';

@Component({
  selector: 'app-product-field-show',
  templateUrl: './product-field-show.component.html',
  styleUrls: ['./product-field-show.component.scss']
})
export class ProductFieldShowComponent implements OnInit {
  product_id: number;
  field_id: number;

  product: Product;
  productField: ProductField;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private productFieldService: ProductFieldService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
       this.product_id = +params.product_id;
       this.field_id = +params.field_id;

       // In a real app: dispatch action to load the details here.
    });
  }

  onDelete(): void {
    this.productFieldService
      .delete(this.field_id)
      .subscribe(data => {
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Deleted', 'successfully');
          this.router.navigate(['products/' + this.product_id + '/fields/' + this.productField.id]);
        }
      }, error => {
          this.toastr.error(error);
      }
    );
  }

  getField(id: number): void {
    this.productFieldService
      .getProductField(id)
      .subscribe(data => {
        this.productField = data.data;
    });
  }
}
