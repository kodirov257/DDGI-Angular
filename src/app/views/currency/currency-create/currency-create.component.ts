import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { CurrencyService } from '@app/utils/services';
import { Currency } from '@app/utils/models';

@Component({
  selector: 'app-currency-create',
  templateUrl: './currency-create.component.html',
  styleUrls: ['./currency-create.component.scss']
})
export class CurrencyCreateComponent implements OnInit, OnDestroy {
  public currencyForm: FormGroup;
  submitted = false;
  error: '';
  public currency: Currency;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private currencyService: CurrencyService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'currency-create-page');
    this.currencyForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      code: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.currencyForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.currencyForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.currencyService.create(this.f)
      .subscribe(data => {
        // this.currency = data;
        // this.router.navigate(['currencies/' + this.currency.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Created', 'successfully');
          // this.router.navigate(['currencies']);
        }
      }, error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'currency-create-page');
  }
}
