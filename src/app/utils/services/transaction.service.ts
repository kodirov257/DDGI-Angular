import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { apiUrl } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  create(form: {[p: string]: AbstractControl}): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'create');
    for (const formKey in form) {
      formData.append(`params[${formKey}]`, form[formKey].value);
    }

    return this.http.post<any>(`${apiUrl}/transactions`, formData);
  }

  getTransaction(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'show');
    formData.append('params[id]', id + '');
    return this.http.post<any>(`${apiUrl}/transactions`, formData);
  }

  update(id: number, form: {[p: string]: AbstractControl}): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'update');
    formData.append('params[id]', id + '');
    for (const formKey in form) {
      formData.append(`params[${formKey}]`, form[formKey].value);
    }
    return this.http.post<any>(`${apiUrl}/transactions`, formData);
  }
}
