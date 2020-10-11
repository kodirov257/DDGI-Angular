import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ProductFieldService } from '@app/utils/services';
import {Product, ProductField} from '@app/utils/models';

@Component({
  selector: 'app-product-field-create',
  templateUrl: './product-field-create.component.html',
  styleUrls: ['./product-field-create.component.scss']
})
export class ProductFieldCreateComponent implements OnInit, OnDestroy {
  product_id: number;

  public fieldForm: FormGroup;
  submitted = false;
  error: '';
  public product: Product;
  public productField: ProductField;

  types = [
    {key: 1, name: 'String'},
    {key: 2, name: 'Integer'},
    {key: 3, name: 'Float'},
  ];

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private productFieldService: ProductFieldService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'product-edit-page');
    this.fieldForm = this.fb.group({
      name: [null, Validators.required],
      product_id: [null, Validators.required],
      type: [null, Validators.required],
      default: [null, Validators.nullValidator],
      variants: [null, Validators.nullValidator],
      required: [null, Validators.required],
      order: [null, Validators.required],
    });

    this.route.params.subscribe(params => {
      this.product_id = +params.product_id;

      this.getProduct(this.product_id);
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.fieldForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.fieldForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.productFieldService.create(this.f)
      .subscribe(data => {
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.productField = data.data;
          this.toastr.success('Added', 'successfully');
          this.router.navigate(['products/' + this.product_id + '/fields/' + this.productField.id]);
        }
      }, error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'product-edit-page');
  }

  getProduct(id: number): void {
    this.productFieldService
      .getProduct(id)
      .subscribe(data => {
        this.product = data.data;
    });
  }
}
