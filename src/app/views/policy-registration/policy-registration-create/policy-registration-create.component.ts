import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

import { PolicyRegistration } from '@app/utils/models';
import { PolicyRegistrationService } from '@app/utils/services';

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

  onFileSelected(event): void {
    this.f.file.setValue(event.target.files[0]);
  }

  onDateSelected(event: any): void {
    this.f.act_date.setValue(`${event.year}-${event.month}-${event.day}`);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.policyRegistrationForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.policyRegistrationService.create(this.f)
      .subscribe(data => {
        if (data.type === HttpEventType.UploadProgress) {
          console.log('Upload progress: ' + Math.round(data.loaded / data.total * 100) + '%');
        } else if (data.type === HttpEventType.Response) {
          console.log(data);
        }

        this.policyRegistration = data.data;
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
