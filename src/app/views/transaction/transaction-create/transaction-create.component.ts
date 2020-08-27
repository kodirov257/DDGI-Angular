import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Transaction } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/models';
import { TransactionService } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/services';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent implements OnInit, OnDestroy {
  public transactionForm: FormGroup;
  submitted = false;
  error: '';
  public transaction: Transaction;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private transactionService: TransactionService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'transaction-create-page');
    this.transactionForm = new FormGroup({
      client_id: new FormControl(null, Validators.required),
      client_type: new FormControl(null, Validators.required),
      bank_id: new FormControl(null, Validators.required),
      sum: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required),
      bank_checking_account_id: new FormControl(null, Validators.required),
      client_checking_account: new FormControl(null, Validators.required),
      contract_id: new FormControl(null, Validators.required),
      comments: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.transactionForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.transactionForm.invalid) {
      this.toastr.error(this.f.cr_by.errors.toString(), 'Errors!');
      return;
    }

    this.transactionService.create(this.f)
      .subscribe(data => {
        this.transaction = data;
        this.router.navigate(['transactions/' + this.transaction.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'transaction-create-page');
  }
}
