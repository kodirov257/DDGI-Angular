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

  create(title: string, isActive: string): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'create');
    formData.append('params[title]', title);
    formData.append('params[is_active]', isActive);

    return this.http.post<any>(`${apiUrl}/users/roles/create`, formData);
  }

  getRole(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'show');
    formData.append('params[id]', id + '');
    return this.http.post<any>(`${apiUrl}/users/roles`, formData);
  }

  update(id: number, title: string, isActive: string): Observable<any> {
    const formData = new FormData();
    formData.append('action', 'update');
    formData.append('params[id]', id + '');
    formData.append('params[title]', title);
    formData.append('params[is_active]', isActive);
    return this.http.post<any>(`${apiUrl}/users/roles`, formData);
  }
}
