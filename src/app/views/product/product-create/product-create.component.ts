import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Group, Klass, Product, View } from '@app/utils/models';
import { ProductService } from '@app/utils/services';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  public productForm: FormGroup;
  submitted = false;
  error: '';
  public product: Product;

  public groups: Group[];
  public klasses: Klass[];
  public views: View[];

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'product-create-page');
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      group_id: [null, Validators.required],
      klass_id: [null, Validators.required],
      view_id: [null, Validators.required],
    });

    this.getGroups();
    this.getKlasses();
    this.getViews();
  }

  get f(): {[p: string]: AbstractControl} { return this.productForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.productService.create(this.f)
      .subscribe(data => {
        // this.product = data;
        // this.router.navigate(['products/' + this.product.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Saved', 'successfully');
          this.router.navigate(['products']);
        }
      }, error => {
          this.error = error;
      }
    );
  }

  getGroups(): void {
    this.productService
      .getGroups()
      .subscribe(data => {
        this.groups = data.data;
      });
  }

  getKlasses(): void {
    this.productService
      .getKlasses()
      .subscribe(data => {
        this.klasses = data.data;
      });
  }

  getViews(): void {
    this.productService
      .getViews()
      .subscribe(data => {
        this.views = data.data;
      });
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'product-create-page');
  }
}
