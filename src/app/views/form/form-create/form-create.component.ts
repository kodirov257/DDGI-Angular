import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

import { FormService } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/services';
import { Form } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/models';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent implements OnInit, OnDestroy {
  public worksheetForm: FormGroup;
  submitted = false;
  error: '';
  public worksheet: Form;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'form-create-page');
    this.worksheetForm = new FormGroup({
      beneficiary_id: new FormControl(null, Validators.required),
      form_type: new FormControl(null, Validators.required),
      date_from: new FormControl(null, Validators.required),
      date_to: new FormControl(null, Validators.required),
      property_name: new FormControl(null, Validators.required),
      client_id: new FormControl(null, Validators.required),
      client_type: new FormControl(null, Validators.required),
      client_checking_account: new FormControl(null, Validators.required),
      region_id: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      insurance_cost: new FormControl(null, Validators.required),
      insurance_sum: new FormControl(null, Validators.required),
      anti_fire_stuff: new FormControl(null, Validators.required),
      security_stuff: new FormControl(null, Validators.required),
      payment_type: new FormControl(null, Validators.required),
      payment_currency: new FormControl(null, Validators.required),
      insurer_id: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.worksheetForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.worksheetForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.formService.create(this.f)
      .subscribe(data => {
        this.worksheet = data;
        this.router.navigate(['forms/' + this.worksheet.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'form-create-page');
  }

}
