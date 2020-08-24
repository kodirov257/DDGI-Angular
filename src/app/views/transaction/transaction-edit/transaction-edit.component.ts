import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Transaction } from '../../../utils/models';
import { TransactionService } from '../../../utils/services';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss']
})
export class TransactionEditComponent implements OnInit, OnDestroy {
  id: number;
  public transactionForm: FormGroup;
  submitted = false;
  error: '';
  public transaction: Transaction;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'transaction-edit-page');
    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getTransaction(this.id);

      this.transactionForm = new FormGroup({
        client_id: new FormControl(this.transaction.client_id, Validators.required),
        client_type: new FormControl(this.transaction.client_type, Validators.required),
        bank_id: new FormControl(this.transaction.bank_id, Validators.required),
        sum: new FormControl(this.transaction.sum, Validators.required),
        time: new FormControl(this.transaction.time, Validators.required),
        bank_checking_account_id: new FormControl(this.transaction.bank_checking_account_id, Validators.required),
        client_checking_account: new FormControl(this.transaction.client_checking_account, Validators.required),
        contract_id: new FormControl(this.transaction.contract_id, Validators.required),
        comments: new FormControl(this.transaction.comments, Validators.required),
      });
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.transactionForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.transactionForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.transactionService.update(this.id, this.f)
      .subscribe(data => {
        this.transaction = data.data;
        this.router.navigate(['transactions/' + this.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'transaction-edit-page');
  }

  getTransaction(id: number): void {
    this.transactionService
      .getTransaction(id)
      .subscribe(data => {
        this.transaction = data.data;
      });
  }
}
