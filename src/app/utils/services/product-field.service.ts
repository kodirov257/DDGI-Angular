import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { apiUrl } from '@app/utils/globals';

import { DynamicFormBase, TextField } from '@app/utils/forms';
import { DropdownField } from '@app/utils/forms/dropdown-field';

@Injectable({
  providedIn: 'root'
})
export class ProductFieldService {

  constructor(private http: HttpClient) { }

  create(form: {[p: string]: AbstractControl}): Observable<any> {
    return this.action(form, 'create');
  }

  update(id: number, form: {[p: string]: AbstractControl}): Observable<any> {
    return this.action(form, 'update', id);
  }

  private action(form: {[p: string]: AbstractControl}, actionName: string, id: number = null): Observable<any> {
    const data: any = {
      action: actionName,
    };
    if (id) {
      data.id = id;
    }
    const params: any = {};

    for (const formKey in form) {
      if (form[formKey].value != null) {
        params[formKey] = form[formKey].value;
      }
    }
    data.params = params;

    return this.http.post<any>(`${apiUrl}/api/product/field/`, data, {
      reportProgress: true,
      responseType: 'json',
      observe: 'events',
    });
  }

  delete(id: number): Observable<any> {
    const data: any = {
      action: 'delete',
      id: id + ''
    };
    return this.http.post<any>(`${apiUrl}/api/product/field/`, data);
  }

  getProductField(id: number): Observable<any> {
    const data: any = {
      action: 'get',
      id: id + ''
    };
    return this.http.post<any>(`${apiUrl}/api/product/field/`, data);
  }

  getProduct(id: number): Observable<any> {
    const data: any = {
      action: 'get',
      id: id + ''
    };
    return this.http.post<any>(`${apiUrl}/api/products/`, data);
  }

  getProducts(): Observable<any> {
    const data: any = {
      action: 'list',
    };
    return this.http.post<any>(`${apiUrl}/api/products/`, data);
  }

  getProductFields(): Observable<DynamicFormBase<string|number|boolean>[]> {
    const fields: DynamicFormBase<string|number|boolean>[] = [

      new DropdownField({
        key: 'brave',
        label: 'Bravery Rating',
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
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        type: 'string',
        required: true,
        order: 1
      }),

      new TextField({
        key: 'emailAddress',
        label: 'Email',
        type: 'string',
        order: 2
      })
    ];

    return of(fields.sort((a, b) => a.order - b.order));

  }
}
