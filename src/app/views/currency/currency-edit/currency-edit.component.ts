import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { CurrencyService } from '../../../utils/services';
import { Currency } from '../../../utils/models';

@Component({
  selector: 'app-currency-edit',
  templateUrl: './currency-edit.component.html',
  styleUrls: ['./currency-edit.component.scss']
})
export class CurrencyEditComponent implements OnInit, OnDestroy {
  id: number;
  public currencyForm: FormGroup;
  submitted = false;
  error: '';
  public currency: Currency;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'bank-edit-page');
    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getCurrency(this.id);

      this.currencyForm = new FormGroup({
        name: new FormControl(this.currency.name, Validators.required),
        code: new FormControl(this.currency.code, Validators.required),
      });
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.currencyForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.currencyForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.currencyService.update(this.id, this.f)
      .subscribe(data => {
        this.currency = data.data;
        this.router.navigate(['currencies/' + this.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'bank-edit-page');
  }

  getCurrency(id: number): void {
    this.currencyService
      .getCurrency(id)
      .subscribe(data => {
        this.currency = data.data;
      });
  }
}
