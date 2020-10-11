import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductFieldService } from '@app/utils/services';
import { DynamicFormBase} from '@app/utils/forms';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
})
export class BlankComponent implements OnInit {
  fields: Observable<DynamicFormBase<any>[]>;

  constructor(
    private productFieldService: ProductFieldService,
  ) {}

  ngOnInit(): void {
    this.fields = this.productFieldService.getProductFields();
  }
}
