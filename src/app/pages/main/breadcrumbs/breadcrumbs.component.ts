import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() label: string;
  @Input() breadcrumbs: any;
  constructor() { }

  ngOnInit(): void {
  }

}
