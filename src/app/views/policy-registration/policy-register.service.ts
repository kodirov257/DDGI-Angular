import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {apiUrl} from '@app/utils/globals';

@Injectable({
  providedIn: 'root'
})
export class PolicyRegisterService {
  public subject = new Subject();
  state: any = {};
  constructor(private http: HttpClient) {
    this.state.table = true;
    this.state.add = false;
    this.state.edit = false;
    this.subject.next(this.state);
  }

  openWindow(name: any): void {
    if (name === 'add') {
      this.state.table = false;
      this.state.edit = false;
      this.state.add = true;
    } else if (name === 'edit'){
      this.state.table = false;
      this.state.add = false;
      this.state.edit = true;
    }
    this.subject.next(this.state);
  }
  closeWindow(close: boolean): void {
    this.state.table = true;
    this.state.add = false;
    this.subject.next(this.state);
  }
  createPolisRegistery(form: any): any {
    const data: any = {};
    data.action = 'create';
    data.params = form.value;
    return this.http.post<any>(`${apiUrl}/api/registered-policies/`, data);
  }

  getState(): any {
    return this.subject.asObservable();
  }
}
