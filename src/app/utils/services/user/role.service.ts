import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {apiUrl} from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  create(form: { [p: string]: AbstractControl }): Observable<any> {
    console.log(form);
    return this.http.post<any>(`${apiUrl}/users/roles/create`, { form });
  }
}
