import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AbstractControl, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { apiUrl } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class PolicyRegistrationService {

  constructor(private http: HttpClient) { }

  create(form: {[p: string]: AbstractControl}): Observable<any> {
    const formData = new FormData();
    const data: any = {};
    // data.action = 'create';
    formData.append('action', 'create');
    for (const formKey in form) {
      if (form[formKey].value instanceof File) {
        data[formKey] = form[formKey].value;
        // formData.append(`${formKey}`, form[formKey].value/*, form[formKey].value.name*/);
      } else {
        data[formKey] = form[formKey].value;
        // formData.append(`params['${formKey}']`, form[formKey].value);
      }
    }
    console.log(data);
    formData.append('params', JSON.stringify(data));
    // console.log(...formData);

    // const data: any = {};
    // data.action = 'create';
    // data.params = form.value;

    return this.http.post<any>(`${apiUrl}/api/registered-policies/`, data, {
      reportProgress: true,
      responseType: 'json',
      observe: 'events',
      headers: {'Content-Type': 'multipart/form-data; charset=utf-8'}
    });
  }

  getPolicyRegistration(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'show');
    formData.append('params[id]', id + '');
    return this.http.post<any>(`${apiUrl}/policy-registrations`, formData);
  }
}
