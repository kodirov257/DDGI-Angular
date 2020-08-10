import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';

import { apiUrl } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  create(form: {[p: string]: AbstractControl}): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'create');
    for (const formKey in form) {
      formData.append(`params[${formKey}]`, form[formKey].value);
    }

    return this.http.post<any>(`${apiUrl}/users/positions`, formData);
  }

  getPosition(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'show');
    formData.append('params[id]', id + '');
    return this.http.post<any>(`${apiUrl}/users/positions`, formData);
  }

  update(id: number, form: {[p: string]: AbstractControl}): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'update');
    formData.append('params[id]', id + '');
    for (const formKey in form) {
      formData.append(`params[${formKey}]`, form[formKey].value);
    }
    return this.http.post<any>(`${apiUrl}/users/positions`, formData);
  }
}
