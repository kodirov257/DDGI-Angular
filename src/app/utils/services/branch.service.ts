import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { apiUrl } from '@app/utils/globals';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

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

    return this.http.post<any>(`${apiUrl}/api/branch/`, data, {
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
    return this.http.post<any>(`${apiUrl}/api/branch/`, data);
  }

  getBranch(id: number): Observable<any> {
    const data: any = {
      action: 'get',
      id: id + ''
    };
    return this.http.post<any>(`${apiUrl}/api/branch/`, data);
  }

  getRegions()/*: Observable<any>*/: {id: number, name: string}[] {
    // const data: any = {
    //   action: 'list',
    // };
    // return this.http.post<any>(`${apiUrl}/api/regions`, data);
    return [
      {
        id: 12,
        name: 'город Ташкент'
      },
      {
        id: 23,
        name: 'Андижанская область'
      },
      {
        id: 34,
        name: 'Самаркандская область'
      },
      {
        id: 45,
        name: 'Ферганская область'
      },
    ];
  }
}
