import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Bank } from '../../../utils/models';
import { BankService } from '../../../utils/services';

@Component({
  selector: 'app-bank-edit',
  templateUrl: './bank-edit.component.html',
  styleUrls: ['./bank-edit.component.scss']
})
export class BankEditComponent implements OnInit, OnDestroy {
  id: number;
  public bankForm: FormGroup;
  submitted = false;
  error: '';
  public bank: Bank;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private bankService: BankService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'bank-edit-page');
    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getBank(this.id);

      this.bankForm = new FormGroup({
        name: new FormControl(this.bank.name, Validators.required),
        mfo: new FormControl(this.bank.mfo, Validators.required),
        inn: new FormControl(this.bank.inn, Validators.required),
        address: new FormControl(this.bank.address, Validators.required),
        phone_number: new FormControl(this.bank.phone_number, Validators.required),
        checking_account: new FormControl(this.bank.checking_account, Validators.required),
      });
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.bankForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.bankForm.invalid) {
      this.toastr.error(this.f.cr_by.errors.toString(), 'Errors!');
      return;
    }

    this.bankService.update(this.id, this.f)
      .subscribe(data => {
        this.bank = data.data;
        this.router.navigate(['banks/' + this.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'bank-edit-page');
  }

  getBank(id: number): void {
    this.bankService
      .getBank(id)
      .subscribe(data => {
        this.bank = data.data;
      });
  }
}
