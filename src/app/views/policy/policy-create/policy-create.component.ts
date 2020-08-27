import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { PolicyService } from '@app/utils/services';
import { Policy } from '@app/utils/models';

@Component({
  selector: 'app-policy-create',
  templateUrl: './policy-create.component.html',
  styleUrls: ['./policy-create.component.scss']
})
export class PolicyCreateComponent implements OnInit, OnDestroy {
  public policyForm: FormGroup;
  submitted = false;
  error: '';
  public policy: Policy;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private policyService: PolicyService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'policy-create-page');
    this.policyForm = new FormGroup({
      contract_id: new FormControl(null, Validators.required),
      contract_number: new FormControl(null, Validators.required),
      property_name: new FormControl(null, Validators.required),
      insurance_place_id: new FormControl(null, Validators.required),
      loan_agreement: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      insurance_case: new FormControl(null, Validators.nullValidator),
      insurance_sum: new FormControl(null, Validators.required),
      franchise: new FormControl(null, Validators.nullValidator),
      total_prize: new FormControl(null, Validators.required),
      paid_insurance_prize: new FormControl(null, Validators.required),
      date_from: new FormControl(null, Validators.required),
      date_to: new FormControl(null, Validators.nullValidator),
      policy_date: new FormControl(null, Validators.required),
      issue_date: new FormControl(null, Validators.required),
      manager: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.policyForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.policyForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.policyService.create(this.f)
      .subscribe(data => {
        this.policy = data;
        this.router.navigate(['policies/' + this.policy.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'policy-create-page');
  }
}
