import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Select2OptionData } from 'ng-select2';

import { environment } from '@environments/environment.prod';
import { AbstractControl } from '@angular/forms';
import { DropdownField, DynamicFormBase, TextField } from '@app/utils/forms';
import { apiUrl } from '@app/utils/globals';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  create(form: {[p: string]: AbstractControl}, insurerForm: {[p: string]: AbstractControl}, beneficiaryForm: {[p: string]: AbstractControl},
         pledgerForm: {[p: string]: AbstractControl}, productForm: {[p: string]: AbstractControl},
         productFields: DynamicFormBase<any>[]): Observable<any> {
    return this.action(form, insurerForm, beneficiaryForm, pledgerForm, productForm, productFields, 'create');
  }

  update(id: number, form: {[p: string]: AbstractControl}, insurerForm: {[p: string]: AbstractControl},
         beneficiaryForm: {[p: string]: AbstractControl}, pledgerForm: {[p: string]: AbstractControl},
         productForm: {[p: string]: AbstractControl}, productFields: DynamicFormBase<any>[]): Observable<any> {
    return this.action(form, insurerForm, beneficiaryForm, pledgerForm, productForm, productFields, 'update', id);
  }

  private action(form: {[p: string]: AbstractControl}, insurerForm: {[p: string]: AbstractControl},
                 beneficiaryForm: {[p: string]: AbstractControl}, pledgerForm: {[p: string]: AbstractControl},
                 productForm: {[p: string]: AbstractControl}, productFields: DynamicFormBase<any>[],
                 actionName: string, id: number = null): Observable<any> {
    const data: any = {
      action: actionName,
    };
    if (id) {
      data.id = id;
    }
    const params: any = {};
    let insurer: any = {};
    let beneficiary: any = {};
    let pledger: any = {};
    const product: any = [];

    for (const formKey in form) {
      if (form[formKey].value != null) {
        params[formKey] = form[formKey].value;
      }
    }
    data.params = params;

    for (const formKey in insurerForm) {
      if (formKey === 'id' && insurerForm[formKey].value != null) {
        params[`insurer_${formKey}`] = insurerForm[formKey].value;
        insurer = {};
        break;
      } else if (insurerForm[formKey].value != null) {
        insurer[formKey] = insurerForm[formKey].value;
      }
    }

    for (const formKey in beneficiaryForm) {
      if (formKey === 'id' && beneficiaryForm[formKey].value != null) {
        params[`beneficiary_${formKey}`] = beneficiaryForm[formKey].value;
        beneficiary = {};
        break;
      } else if (beneficiaryForm[formKey].value != null) {
        beneficiary[formKey] = beneficiaryForm[formKey].value;
      }
    }

    for (const formKey in pledgerForm) {
      if (formKey === 'id' && pledgerForm[formKey].value != null) {
        params[`pledger_${formKey}`] = pledgerForm[formKey].value;
        pledger = {};
        break;
      } else if (pledgerForm[formKey].value != null) {
        pledger[formKey] = pledgerForm[formKey].value;
      }
    }

    let count = 0;
    for (const formKey in productForm) {
      if (productForm[formKey].value != null) {
        // product[formKey] = productForm[formKey].value;
        product.push({
          field_id: productFields[count].id,
          value: productForm[formKey].value,
          name: formKey,
        });
        count++;
      } else {
        count++;
      }
    }

    if (!insurer.empty()) {
      data.params.insurer = insurer;
    }

    if (!beneficiary.empty()) {
      data.params.beneficiary = beneficiary;
    }

    if (!pledger.empty()) {
      data.params.pledger = pledger;
    }

    if (!product.empty()) {
      data.params.product_fields = product;
    }

    return this.http.post<any>(`${apiUrl}/api/branch/`, data, {
      reportProgress: true,
      responseType: 'json',
      observe: 'events',
    });
  }

  getForm(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'show');
    formData.append('params[id]', id + '');
    return this.http.post<any>(`${environment.apiUrl}/forms`, formData);
  }

  getProducts()/*: Observable<any>*/: {id: string, text: string}[] {
    // const formData = new FormData();
    // formData.append('action', 'get');
    // return this.http.post<any>(`${environment.apiUrl}/positions`, formData);
    return [
      {
        id: '1',
        text: 'Залог'
      },
      {
        id: '2',
        text: 'Авто кредит'
      },
      {
        id: '3',
        text: 'Ипотека'
      },
      {
        id: '4',
        text: 'Авто стаховка'
      },
    ];
  }

  getInsurers(type: number)/*: Observable<any>*/: {id: string, text: string}[] {
    // const formData = new FormData();
    // formData.append('action', 'list');
    // return this.http.post<any>(`${environment.apiUrl}/insurers`, formData);
    return [
      {
        id: '1',
        text: 'Залог'
      },
      {
        id: '2',
        text: 'Авто кредит'
      },
      {
        id: '3',
        text: 'Ипотека'
      },
      {
        id: '4',
        text: 'Авто стаховка'
      },
    ];
  }

  getBeneficiaries()/*: Observable<any>*/: {id: string, text: string}[] {
    // const formData = new FormData();
    // formData.append('action', 'list');
    // return this.http.post<any>(`${environment.apiUrl}/beneficiaries`, formData);
    return [
      {
        id: '1',
        text: 'Залог'
      },
      {
        id: '2',
        text: 'Авто кредит'
      },
      {
        id: '3',
        text: 'Ипотека'
      },
      {
        id: '4',
        text: 'Авто стаховка'
      },
    ];
  }

  getPledgers()/*: Observable<any>*/: {id: string, text: string}[] {
    // const formData = new FormData();
    // formData.append('action', 'list');
    // return this.http.post<any>(`${environment.apiUrl}/pledgers`, formData);
    return [
      {
        id: '1',
        text: 'Залог'
      },
      {
        id: '2',
        text: 'Авто кредит'
      },
      {
        id: '3',
        text: 'Ипотека'
      },
      {
        id: '4',
        text: 'Авто стаховка'
      },
    ];
  }

  getBanks()/*: Observable<any>*/: {id: string, text: string}[] {
    // const data: any = {
    //   action: 'list',
    // };
    // return this.http.post<any>(`${apiUrl}/api/banks`, data);
    return [
      {
        id: '1',
        text: 'Асака банк'
      },
      {
        id: '2',
        text: 'Ипак йули банк'
      },
      {
        id: '3',
        text: 'Ипотека банк'
      },
      {
        id: '4',
        text: 'Авто банк'
      },
    ];
  }

  getInsuranceRisks()/*: Observable<any>*/: {id: string, text: string}[] {
    // const formData = new FormData();
    // formData.append('action', 'list');
    // return this.http.post<any>(`${environment.apiUrl}/risks`, formData);
    return [
      {
        id: '1',
        text: 'Наводнение'
      },
      {
        id: '2',
        text: 'Пожар'
      },
      {
        id: '3',
        text: 'Ипотека банк'
      },
      {
        id: '4',
        text: 'Авто банк'
      },
    ];
  }

  getProductFields(productId: number): DynamicFormBase<string|number|boolean>[] {
    let fields: DynamicFormBase<string|number|boolean>[] = [];
    if (productId === 1) {
      fields = [
        new DropdownField({
          id: 1,
          key: 'brave',
          name: 'Bravery Rating',
          options: [
            {key: 'solid',  value: 'Solid'},
            {key: 'great',  value: 'Great'},
            {key: 'good',   value: 'Good'},
            {key: 'unproven', value: 'Unproven'}
          ],
          type: 'dropdown',
          order: 3
        }),

        new TextField({
          id: 2,
          key: 'firstName',
          name: 'First name',
          value: 'Bombasto',
          type: 'string',
          required: true,
          order: 1
        }),

        new TextField({
          id: 3,
          key: 'emailAddress',
          name: 'Email',
          type: 'string',
          order: 2
        })
      ];
    } else if (productId === 2) {
      fields = [
        new TextField({
          id: 5,
          key: 'lastName',
          name: 'Last name',
          type: 'string',
          required: true,
          order: 1
        }),

        new TextField({
          id: 8,
          key: 'firstName',
          name: 'First name',
          value: 'Bombasto',
          type: 'string',
          required: true,
          order: 1
        }),

        new TextField({
          id: 11,
          key: 'emailAddress',
          name: 'Email',
          type: 'string',
          order: 2
        })
      ];
    } else {
      fields = [
        new TextField({
          id: 12,
          key: 'lastName',
          name: 'Last name',
          type: 'string',
          required: true,
          order: 1
        }),

        new TextField({
          id: 15,
          key: 'firstName',
          name: 'First name',
          value: 'Bombasto',
          type: 'string',
          required: true,
          order: 1
        }),

        new TextField({
          id: 55,
          key: 'middleName',
          name: 'Middle name',
          type: 'string',
          order: 2
        })
      ];
    }

    fields.sort((a, b) => a.order - b.order);

    return fields;

    // return of(fields.sort((a, b) => a.order - b.order));

  }
}
