import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { FormService } from '../../../utils/services';
import { Form } from '../../../utils/models';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit, OnDestroy {
  id: number;
  public worksheetForm: FormGroup;
  submitted = false;
  error: '';
  public worksheet: Form;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private formService: FormService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'form-edit-page');
    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getForm(this.id);

      this.worksheetForm = new FormGroup({
        beneficiary_id: new FormControl(this.worksheet.beneficiary_id, Validators.required),
        form_type: new FormControl(this.worksheet.form_type, Validators.required),
        date_from: new FormControl(this.worksheet.date_from, Validators.required),
        date_to: new FormControl(this.worksheet.date_to, Validators.required),
        property_name: new FormControl(this.worksheet.property_name, Validators.required),
        client_id: new FormControl(this.worksheet.client_id, Validators.required),
        client_type: new FormControl(this.worksheet.client_type, Validators.required),
        client_checking_account: new FormControl(this.worksheet.client_checking_account, Validators.required),
        region_id: new FormControl(this.worksheet.region_id, Validators.required),
        quantity: new FormControl(this.worksheet.quantity, Validators.required),
        insurance_cost: new FormControl(this.worksheet.insurance_cost, Validators.required),
        insurance_sum: new FormControl(this.worksheet.insurance_sum, Validators.required),
        anti_fire_stuff: new FormControl(this.worksheet.anti_fire_stuff, Validators.required),
        security_stuff: new FormControl(this.worksheet.security_stuff, Validators.required),
        payment_type: new FormControl(this.worksheet.payment_type, Validators.required),
        payment_currency: new FormControl(this.worksheet.payment_currency, Validators.required),
        insurer_id: new FormControl(this.worksheet.insurer_id, Validators.required),
      });
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.worksheetForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.worksheetForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.formService.update(this.id, this.f)
      .subscribe(data => {
        this.worksheet = data.data;
        this.router.navigate(['forms/' + this.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'form-edit-page');
  }

  getForm(id: number): void {
    this.formService
      .getForm(id)
      .subscribe(data => {
        this.worksheet = data.data;
      });
  }
}
