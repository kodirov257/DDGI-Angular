import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { PolicyRegistration } from '@app/utils/models';
import { PolicyRegistrationService } from '@app/utils/services';
import { apiUrl } from '@app/utils/globals';

@Component({
  selector: 'app-policy-registration-edit',
  templateUrl: './policy-registration-edit.component.html',
  styleUrls: ['./policy-registration-edit.component.scss']
})
export class PolicyRegistrationEditComponent implements OnInit, OnDestroy {
  id: number;
  public policyRegistrationForm: FormGroup;
  submitted = false;
  fileExists: boolean;
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
    private route: ActivatedRoute,
  ) {
    this.fileExists = false;
  }

  ngOnInit(): void {
    this.setForm();

    this.renderer.addClass(document.querySelector('app-root'), 'policy-registration-edit-page');
    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getPolicyRegistration(this.id);
    });
  }

  setForm(): void {
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
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    if ((typeof this.f.act_date.value) === 'object') {
      const date = this.f.act_date.value;
      this.f.act_date.setValue(`${date.year}-${date.month}-${date.day}`);
    }

    console.log(this.policyRegistrationForm.value);

    this.policyRegistrationService.update(this.id, this.f)
      .subscribe(data => {
        // this.policyRegistration = data.data;
        // this.router.navigate(['policy-registrations/' + this.policyRegistration.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Updated', 'successfully');
          this.router.navigate(['policy-registrations']);
        }
      }, error => {
          this.error = error;
      }
    );
  }

  closeForm(): void {
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'policy-registration-edit-page');
  }

  getPolicyRegistration(id: number): void {
    this.policyRegistrationService
      .getPolicyRegistration(id)
      .subscribe(data => {
        this.policyRegistration = data.data;

        const date = this.policyRegistration.act_date.split('-');

        this.policyRegistrationForm.patchValue({
          act_number: this.policyRegistration.act_number,
          act_date: {year: +date[0], month: +date[1], day: +date[2]},
          polis_number_from: this.policyRegistration.polis_number_from,
          polis_number_to: this.policyRegistration.polis_number_to,
          polis_quantity: this.policyRegistration.polis_quantity,
          polis_status: this.policyRegistration.polis_status,
          // file: apiUrl + data.data.document,
        });
      });
  }
}
