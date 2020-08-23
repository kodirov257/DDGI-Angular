import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { PolicyRegistration } from '../../../utils/models';
import { PolicyRegistrationService } from '../../../utils/services';

@Component({
  selector: 'app-policy-registration-create',
  templateUrl: './policy-registration-create.component.html',
  styleUrls: ['./policy-registration-create.component.scss']
})
export class PolicyRegistrationCreateComponent implements OnInit, OnDestroy {
  public policyRegistrationForm: FormGroup;
  submitted = false;
  error: '';
  public policyRegistration: PolicyRegistration;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private policyRegistrationService: PolicyRegistrationService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'policy-registration-create-page');
    this.policyRegistrationForm = new FormGroup({
      act_number: new FormControl(null, Validators.required),
      act_date: new FormControl(null, Validators.required),
      policy_number_from: new FormControl(null, Validators.required),
      policy_number_to: new FormControl(null, Validators.required),
      policy_quantity: new FormControl(null, Validators.required),
      policy_status: new FormControl(null, Validators.required),
      file: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.policyRegistrationForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.policyRegistrationForm.invalid) {
      this.toastr.error(this.f.cr_by.errors.toString(), 'Errors!');
      return;
    }

    this.policyRegistrationService.create(this.f)
      .subscribe(data => {
        this.policyRegistration = data;
        this.router.navigate(['policy-registrations/' + this.policyRegistration.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'policy-registration-create-page');
  }
}
