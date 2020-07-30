import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiUrl} from '../../globals';
import {Observable} from 'rxjs';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  create(form: { [p: string]: AbstractControl }): Observable<any> {
    console.log(form);
    return this.http.post<any>(`${apiUrl}/users/permissions/create`, { form });
  }
}
