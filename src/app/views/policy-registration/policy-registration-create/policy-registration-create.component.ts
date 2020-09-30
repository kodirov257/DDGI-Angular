import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { PolicyRegistration } from '@app/utils/models';
import { PolicyRegistrationService } from '@app/utils/services';
import {PolicyRegisterService} from '@app/views/policy-registration/policy-register.service';

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
  statuses = [
    {id: 1, name: 'Created'},
    {id: 2, name: 'Approved'},
    {id: 3, name: 'Closed'},
  ];

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private policyRegistrationService: PolicyRegistrationService,
    private myService: PolicyRegisterService
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'policy-registration-create-page');
    this.policyRegistrationForm = new FormGroup({
      act_number: new FormControl(null, Validators.required),
      act_date: new FormControl(null, Validators.required),
      polis_number_from: new FormControl(null, Validators.required),
      polis_number_to: new FormControl(null, Validators.required),
      polis_quantity: new FormControl(null, Validators.required),
      polis_status: new FormControl(null, Validators.required),
      file: new FormControl(null, Validators.nullValidator),
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
      this.toastr.error(this.policyRegistrationForm.status, 'Errors!');
      return;
    }
    this.policyRegistrationService.create(this.f)
      .subscribe(response => {
        if (response.success === false) {
          this.toastr.error(response.error_msg, response.success);
        } else {
          this.toastr.success('Saved', 'successfully');
          this.router.navigate(['policy-registrations']);
        }
      }, err => {
            this.toastr.error(err, err);
      }
    );

    // this.policyRegistrationService.create(this.f)
    //   .subscribe(data => {
    //     if (data.type === HttpEventType.UploadProgress) {
    //       console.log('Upload progress: ' + Math.round(data.loaded / data.total * 100) + '%');
    //     } else if (data.type === HttpEventType.Response) {
    //       console.log(data);
    //     }
    //
    //     this.policyRegistration = data.data;
    //     this.router.navigate(['policy-registrations/' + this.policyRegistration.id]);
    //     },
    //   error => {
    //       this.error = error;
    //   }
    // );
  }
  closeForm(): void {
    this.myService.closeWindow(true);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'policy-registration-create-page');
  }
}
