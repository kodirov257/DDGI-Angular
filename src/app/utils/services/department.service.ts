import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { apiUrl } from '@app/utils/globals';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  create(form: {[p: string]: AbstractControl}): Observable<any> {
    return this.action(form, 'create');
  }

  update(id: number, form: {[p: string]: AbstractControl}): Observable<any> {
    return this.action(form, 'update', id);
  }

  private action(form: {[p: string]: AbstractControl}, actionName: string, id: number = null): Observable<any> {
    const formData = new FormData();
    const data: any = {};
    formData.append('action', actionName);
    if (id) {
      formData.append('id', id + '');
    }
    for (const formKey in form) {
      if (form[formKey].value instanceof File) {
        formData.append(`${formKey}`, form[formKey].value/*, form[formKey].value.name*/);
      } else if (form[formKey].value != null) {
        data[formKey] = form[formKey].value;
      }
    }
    formData.append('params', JSON.stringify(data));

    return this.http.post<any>(`${apiUrl}/api/departments/`, formData, {
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
    return this.http.post<any>(`${apiUrl}/api/departments/`, data);
  }

  getDepartment(id: number): Observable<any> {
    const data: any = {
      action: 'get',
      id: id + ''
    };
    return this.http.post<any>(`${apiUrl}/api/departments/`, data);
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

  getBranches(regionId: number)/*: Observable<any>*/: {id: number, name: string}[] {
    // const data: any = {
    //   action: 'list',
    //   params: {
    //     region_id: regionId,
    //   },
    // };
    // return this.http.post<any>(`${apiUrl}/api/branches`, data);
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
