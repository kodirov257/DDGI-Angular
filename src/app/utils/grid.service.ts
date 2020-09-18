import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@environments/environment.prod';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {apiUrl} from '@app/utils/globals';


@Injectable({providedIn: 'root'})
export class GridService {
  myDt: any;
  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  geDtOptions(code: string): any {
    this.http.post<any>(`${apiUrl}/api/grid/`, {gridCodeName: code}).subscribe({
        next: response => {
          this.myDt = response;
          console.log(this.myDt);
        },
        error: error => this.toastr.error('Error', error)

      }
    );
    return this.myDt;
  }
  initDt(code: string): Observable<any>{
    return this.http.post<any>(`${apiUrl}/api/grid/`, {gridCodeName: code});
  }

  dtObjToHttpParam(obj: any): HttpParams {
    let param = new HttpParams()
      .set('search[value]', obj.search.value.toString())
      .set('search[regex]', obj.search.regex)
      .set('length', obj.length)
      .set('start', obj.start)
      .set('draw', obj.draw)
      .set('format', 'datatables');
    for (let c in obj.columns) {
      param = param.set('columns[' + c + '][data]', obj.columns[c].data);
      param = param.set('columns[' + c + '][name]', obj.columns[c].name);
      param = param.set('columns[' + c + '][searchable]', obj.columns[c].searchable);
      param = param.set('columns[' + c + '][orderable]', obj.columns[c].orderable);
      param = param.set('columns[' + c + '][search][value]', obj.columns[c].search.value.toString());
      param = param.set('columns[' + c + '][search][regex]', obj.columns[c].search.regex);
    }
    for (let i in obj.order) {
      param = param.set('order[' + i + '][column]', obj.order[i].column);
      param = param.set('order[' + i + '][dir]', obj.order[i].dir);
    }
    return param;
  }

  applyFilterParams(params: HttpParams, filterParams: any): HttpParams{
    params =  params.append('filter_param', JSON.stringify(filterParams));
    return params;
  }



}
