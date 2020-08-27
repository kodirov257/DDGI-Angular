import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/models';
import { ProductService } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/services';

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
    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getProduct(this.id);

      this.productForm = new FormGroup({
        name: new FormControl(this.product.name, Validators.required),
      });
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.productForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      this.toastr.error(this.f.cr_by.errors.toString(), 'Errors!');
      return;
    }

    this.productService.update(this.id, this.f)
      .subscribe(data => {
        this.product = data.data;
        this.router.navigate(['products/' + this.id]);
        },
      error => {
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
      });
  }
}
