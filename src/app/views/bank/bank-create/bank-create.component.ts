import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Bank } from '../../../utils/models';
import { BankService } from '../../../utils/services';

@Component({
  selector: 'app-bank-create',
  templateUrl: './bank-create.component.html',
  styleUrls: ['./bank-create.component.scss']
})
export class BankCreateComponent implements OnInit, OnDestroy {
  public bankForm: FormGroup;
  submitted = false;
  error: '';
  public bank: Bank;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private bankService: BankService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'bank-create-page');
    this.bankForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      mfo: new FormControl(null, Validators.required),
      inn: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone_number: new FormControl(null, Validators.required),
      checking_account: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.bankForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.bankForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.bankService.create(this.f)
      .subscribe(data => {
        this.bank = data;
        this.router.navigate(['banks/' + this.bank.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'bank-create-page');
  }
}
