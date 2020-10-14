import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { apiUrl } from '../globals';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

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

    return this.http.post<any>(`${apiUrl}/api/product/`, data, {
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
    return this.http.post<any>(`${apiUrl}/api/product/`, data);
  }

  getProduct(id: number): Observable<any> {
    const data: any = {
      action: 'get',
      id: id + ''
    };
    return this.http.post<any>(`${apiUrl}/api/product/`, data);
  }

  getGroups(): Observable<any> {
    const data: any = {
      action: 'list',
    };
    return this.http.post<any>(`${apiUrl}/api/group/`, data);
  }

  getKlasses(): Observable<any> {
    const data: any = {
      action: 'list',
    };
    return this.http.post<any>(`${apiUrl}/api/klass/`, data);
  }

  getViews(): Observable<any> {
    const data: any = {
      action: 'list',
    };
    return this.http.post<any>(`${apiUrl}/api/vid/`, data);
  }

  getProductFields(productId: number): Observable<any> {
    const data: any = {
      action: 'list',
      product_id: productId,
    };
    return this.http.post<any>(`${apiUrl}/api/product-field/`, data);
  }

  sortProductField(fieldId: number, where: string): Observable<any> {
    const data: any = {
      action: 'sort',
      field_id: fieldId,
      sort: where,
    };
    return this.http.post<any>(`${apiUrl}/api/product-field/`, data);
  }
}
