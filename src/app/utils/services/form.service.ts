import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiUrl } from '../globals';
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

    return this.http.post<any>(`${apiUrl}/forms/create`, formData);
  }

  getForm(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'show');
    formData.append('params[id]', id + '');
    return this.http.post<any>(`${apiUrl}/forms`, formData);
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
    return this.http.post<any>(`${apiUrl}/forms`, formData);
  }
}
