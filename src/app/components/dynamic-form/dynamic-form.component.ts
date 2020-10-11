import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ProductFieldFormService } from '@app/utils/services';
import { DynamicFormBase } from '@app/utils/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: DynamicFormBase<string|number|boolean>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(
    private pffs: ProductFieldFormService,
  ) {  }

  ngOnInit(): void {
    this.form = this.pffs.toFormGroup(this.fields);
  }

  onSubmit(): void {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
