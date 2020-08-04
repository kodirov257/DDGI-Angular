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

  create(codeName: string, title: string): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'create');
    formData.append('params[code_name]', codeName);
    formData.append('params[title]', title);

    return this.http.post<any>(`${apiUrl}/users/permissions`, formData);
  }

  getPermission(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'show');
    formData.append('params[id]', id + '');
    return this.http.post<any>(`${apiUrl}/users/permissions`, formData);
  }

  update(id: number, codeName: string, title: string): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'create');
    formData.append('params[id]', id + '');
    formData.append('params[code_name]', codeName);
    formData.append('params[title]', title);
    return this.http.post<any>(`${apiUrl}/users/permissions`, formData);
  }
}
