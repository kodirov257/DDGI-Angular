import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { InsuranceContract } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/models';
import { InsuranceContractService } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/services';

@Component({
  selector: 'app-insurance-contract-edit',
  templateUrl: './insurance-contract-edit.component.html',
  styleUrls: ['./insurance-contract-edit.component.scss']
})
export class InsuranceContractEditComponent implements OnInit, OnDestroy {
  id: number;
  public insuranceContractForm: FormGroup;
  submitted = false;
  error: '';
  public insuranceContract: InsuranceContract;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private insuranceContractService: InsuranceContractService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'insurance-contract-edit-page');
    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getInsuranceContract(this.id);

      this.insuranceContractForm = new FormGroup({
        contract_number: new FormControl(this.insuranceContract.contract_number, Validators.required),
        contract_date: new FormControl(this.insuranceContract.contract_date, Validators.required),
        region_id: new FormControl(this.insuranceContract.region_id, Validators.required),
        client_id: new FormControl(this.insuranceContract.client_id, Validators.required),
        client_type: new FormControl(this.insuranceContract.client_type, Validators.required),
        client_checking_account: new FormControl(this.insuranceContract.client_checking_account, Validators.required),
        beneficiary_id: new FormControl(this.insuranceContract.beneficiary_id, Validators.required),
        pledger_id: new FormControl(this.insuranceContract.pledger_id, Validators.required),
        user_id: new FormControl(this.insuranceContract.user_id, Validators.required),
        loan_agreement: new FormControl(this.insuranceContract.loan_agreement, Validators.required),
        property_name: new FormControl(this.insuranceContract.property_name, Validators.required),
        quantity: new FormControl(this.insuranceContract.quantity, Validators.required),
        insurance_cost: new FormControl(this.insuranceContract.insurance_cost, Validators.required),
        insurance_sum: new FormControl(this.insuranceContract.insurance_sum, Validators.required),
        franchise: new FormControl(this.insuranceContract.franchise, Validators.required),
        date_from: new FormControl(this.insuranceContract.date_from, Validators.required),
        date_to: new FormControl(this.insuranceContract.date_to, Validators.required),
        installment_date: new FormControl(this.insuranceContract.installment_date, Validators.required),
      });
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.insuranceContractForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.insuranceContractForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.insuranceContractService.update(this.id, this.f)
      .subscribe(data => {
        this.insuranceContract = data.data;
        this.router.navigate(['insurance-contracts/' + this.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'insurance-contract-edit-page');
  }

  getInsuranceContract(id: number): void {
    this.insuranceContractService
      .getInsuranceContract(id)
      .subscribe(data => {
        this.insuranceContract = data.data;
      });
  }
}
