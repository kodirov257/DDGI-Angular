import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { apiUrl } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class BankService {

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

    return this.http.post<any>(`${apiUrl}/api/banks/`, formData, {
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
    return this.http.post<any>(`${apiUrl}/api/banks/`, data);
  }

  getBank(id: number): Observable<any> {
    const data: any = {
      action: 'get',
      id: id + ''
    };
    return this.http.post<any>(`${apiUrl}/api/banks/`, data);
  }

  getBanks()/*: Observable<any>*/: {id: string, text: string}[] {
    // const data: any = {
    //   action: 'list',
    // };
    // return this.http.post<any>(`${apiUrl}/api/banks`, data);
    return [
      {
        id: '1',
        text: 'Асака банк'
      },
      {
        id: '2',
        text: 'Ипак йули банк'
      },
      {
        id: '3',
        text: 'Ипотека банк'
      },
      {
        id: '4',
        text: 'Авто банк'
      },
    ];
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

  public getChildrenRegions(id: number)/*: Observable<any>*/: {id: number, name: string}[] {
    // const data: any = {
    //   action: 'children-list',
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
