import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { InsuranceContract } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/models';
import { InsuranceContractService } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/services';

@Component({
  selector: 'app-insurance-contract-create',
  templateUrl: './insurance-contract-create.component.html',
  styleUrls: ['./insurance-contract-create.component.scss']
})
export class InsuranceContractCreateComponent implements OnInit, OnDestroy {
  public insuranceContractForm: FormGroup;
  submitted = false;
  error: '';
  public insuranceContract: InsuranceContract;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private insuranceContractService: InsuranceContractService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'insurance-contract-create-page');
    this.insuranceContractForm = new FormGroup({
      contract_number: new FormControl(null, Validators.required),
      contract_date: new FormControl(null, Validators.required),
      region_id: new FormControl(null, Validators.required),
      client_id: new FormControl(null, Validators.required),
      client_type: new FormControl(null, Validators.required),
      client_checking_account: new FormControl(null, Validators.required),
      beneficiary_id: new FormControl(null, Validators.required),
      pledger_id: new FormControl(null, Validators.required),
      user_id: new FormControl(null, Validators.required),
      loan_agreement: new FormControl(null, Validators.required),
      property_name: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      insurance_cost: new FormControl(null, Validators.required),
      insurance_sum: new FormControl(null, Validators.required),
      franchise: new FormControl(null, Validators.required),
      date_from: new FormControl(null, Validators.required),
      date_to: new FormControl(null, Validators.required),
      installment_date: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.insuranceContractForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.insuranceContractForm.invalid) {
      this.toastr.error(this.f.cr_by.errors.toString(), 'Errors!');
      return;
    }

    this.insuranceContractService.create(this.f)
      .subscribe(data => {
        this.insuranceContract = data;
        this.router.navigate(['insurance-contracts/' + this.insuranceContract.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'insurance-contract-create-page');
  }
}
