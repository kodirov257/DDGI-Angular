import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Select2OptionData } from 'ng-select2';

import { environment } from '@environments/environment.prod';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  create(form: {[p: string]: AbstractControl}): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'create');
    for (const formKey in form) {
      if (form[formKey].value.file) {
        formData.append(`params[${formKey}]`, form[formKey].value, form[formKey].value.name);
      } else {
        formData.append(`params[${formKey}]`, form[formKey].value);
      }
    }

    return this.http.post<any>(`${environment.apiUrl}/forms/create`, formData);
  }

  getForm(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'show');
    formData.append('params[id]', id + '');
    return this.http.post<any>(`${environment.apiUrl}/forms`, formData);
  }

  update(id: number, form: {[p: string]: AbstractControl}): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'update');
    formData.append('params[id]', id + '');
    for (const formKey in form) {
      if (form[formKey].value.file) {
        formData.append(`params[${formKey}]`, form[formKey].value, form[formKey].value.name);
      } else {
        formData.append(`params[${formKey}]`, form[formKey].value);
      }
    }
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
    // const formData = new FormData();
    // formData.append('action', 'list');
    // return this.http.post<any>(`${environment.apiUrl}/entities`, formData);
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
}
