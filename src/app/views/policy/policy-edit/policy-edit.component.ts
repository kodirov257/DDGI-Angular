import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Policy } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/models';
import { PolicyService } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/services';

@Component({
  selector: 'app-policy-edit',
  templateUrl: './policy-edit.component.html',
  styleUrls: ['./policy-edit.component.scss']
})
export class PolicyEditComponent implements OnInit, OnDestroy {
  id: number;
  public policyForm: FormGroup;
  submitted = false;
  error: '';
  public policy: Policy;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private policyService: PolicyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'policy-edit-page');
    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getPolicy(this.id);

      this.policyForm = new FormGroup({
        contract_id: new FormControl(this.policy.contract_id, Validators.required),
        contract_number: new FormControl(this.policy.contract_number, Validators.required),
        property_name: new FormControl(this.policy.property_name, Validators.required),
        insurance_place_id: new FormControl(this.policy.insurance_place_id, Validators.required),
        loan_agreement: new FormControl(this.policy.loan_agreement, Validators.required),
        quantity: new FormControl(this.policy.quantity, Validators.required),
        insurance_case: new FormControl(this.policy.insurance_case, Validators.nullValidator),
        insurance_sum: new FormControl(this.policy.insurance_sum, Validators.required),
        franchise: new FormControl(this.policy.franchise, Validators.nullValidator),
        total_prize: new FormControl(this.policy.total_prize, Validators.required),
        paid_insurance_prize: new FormControl(this.policy.paid_insurance_prize, Validators.required),
        date_from: new FormControl(this.policy.date_from, Validators.required),
        date_to: new FormControl(this.policy.date_to, Validators.nullValidator),
        policy_date: new FormControl(this.policy.policy_date, Validators.required),
        issue_date: new FormControl(this.policy.issue_date, Validators.required),
        manager: new FormControl(this.policy.manager, Validators.required),
      });
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.policyForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.policyForm.invalid) {
      this.toastr.error(this.f.cr_by.errors.toString(), 'Errors!');
      return;
    }

    this.policyService.update(this.id, this.f)
      .subscribe(data => {
        this.policy = data.data;
        this.router.navigate(['policies/' + this.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'policy-edit-page');
  }

  getPolicy(id: number): void {
    this.policyService
      .getPolicy(id)
      .subscribe(data => {
        this.policy = data.data;
      });
  }
}
