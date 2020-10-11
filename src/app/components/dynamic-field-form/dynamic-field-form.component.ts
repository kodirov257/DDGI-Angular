import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormBase } from '@app/utils/forms';

@Component({
  selector: 'app-dynamic-field-form',
  templateUrl: './dynamic-field-form.component.html',
  styleUrls: ['./dynamic-field-form.component.scss']
})
export class DynamicFieldFormComponent implements OnInit {
  @Input() field: DynamicFormBase<string|number|boolean>;
  @Input() form: FormGroup;
  get isValid(): boolean { return this.form.controls[this.field.key].valid; }

  constructor() { }

  ngOnInit(): void {
  }

}
