import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DynamicFormBase } from '@app/utils/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductFieldFormService {

  constructor() { }

  toFormGroup(fields: DynamicFormBase<string|number|boolean>[]): FormGroup {
    const group: any = {};

    fields.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
