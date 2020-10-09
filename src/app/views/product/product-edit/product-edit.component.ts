import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '@app/utils/models';
import { ProductService } from '@app/utils/services';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  id: number;
  public productForm: FormGroup;
  submitted = false;
  error: '';
  public product: Product;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'product-edit-page');
    this.productForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getProduct(this.id);
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.productForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.productService.update(this.id, this.f)
      .subscribe(data => {
        // this.product = data.data;
        // this.router.navigate(['products/' + this.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Updated', 'successfully');
          this.router.navigate(['products']);
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
    this.productService
      .getProduct(id)
      .subscribe(data => {
        this.product = data.data;

        this.productForm.patchValue({
          name: this.product.name,
        });
      });
  }
}
