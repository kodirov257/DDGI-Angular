import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { GridService } from '@app/utils/grid.service';
import Responsive from 'datatables.net-responsive';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import {  ProductService } from '@app/utils/services';
import { apiUrl } from '@app/utils/globals';
@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.scss']
})
export class ProductIndexComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: any;
  tdata: any;
  selectedRow: any;
  reqParam: HttpParams;
  filterParam: any = {};
  subscription: Subscription;

  constructor(private http: HttpClient,
              private dtService: GridService,
              private toastr: ToastrService,
              private router: Router,
              private productService: ProductService
  ) {}

  displayAddForm(name: string): void {
    this.router.navigate(['/products/create']);
     // this.myService.openWindow(name);
  }

  displayEditForm(id: number): void {
    this.router.navigate([`/products/${id}/edit`]);
  }

  displayFieldForm(id: number): void {
    this.router.navigate([`/products/${id}/fields/create`]);
  }

  renderTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  getSelectedRows(): any {   // used when table has multi select feature
    let selected;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      selected = dtInstance.rows({selected: true}).data();
      return selected;
    });
  }
  doubleClickHandler(rowdata: any): void {
    console.log(rowdata);
    this.getSelectedRows();
  }
  clickHandler(rowdata: any): void {
    if (this.selectedRow === rowdata){
      this.selectedRow = null;
    } else {
      this.selectedRow = rowdata;
    }
  }

  ngOnInit(): void {
    this.dtService.initDt('product').toPromise()   // Get Dt options from back by code_name
      .then((response) => {
        this.dtOptions = response;   // this.dtOptions is object stores our datatable config options from backend
        //  //  //
        this.dtOptions.ajax = (dataTablesParameters: any, callback) => {
          this.reqParam = this.dtService.dtObjToHttpParam(dataTablesParameters);
          this.http.get(apiUrl + this.dtOptions.dataPath.toString(), {params: this.reqParam}).subscribe(resp => {
            this.tdata = resp;
            callback({
              recordsTotal: this.tdata.recordsTotal,
              recordsFiltered: this.tdata.recordsFiltered,
              data: this.tdata.data
            });
          });
        };
        this.dtOptions.select = {
          style: 'os'  // make style value 'multi' to select multiple rows in a atable
        };
        // //
        this.dtOptions.responsive = {
          details: {
            display: Responsive.display.modal({
              header(row) {
                const data = row.data();
                return 'Details for ' + Object.values(data)[0] + ' ' + Object.values(data)[1];
              }
            }),
            renderer: Responsive.renderer.tableAll({
              tableClass: 'table'
            })
          }
        };
        // this.dtOptions.rowCallback = (row: Node, data: any[] | Object, index: number) => {
        //   const self = this;
        //   $('td', row).unbind('dblclick');
        //   $('td', row).bind('dblclick', () => {
        //     self.doubleClickHandler(data);
        //   });
        //   return row;
        // };
        // tslint:disable-next-line:ban-types
        this.dtOptions.rowCallback = (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).unbind('click');
          $('td', row).bind('click', () => {
            this.clickHandler(data);
          });
          return row;
        };
        this.dtOptions.stateSave = true;
      })
      .catch((error) => {
        this.toastr.error('Error', error.toString());
      });
  }

}
