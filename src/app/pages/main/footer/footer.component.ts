import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { version } from './../../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public appVersion = version;
  constructor() {}

  // tslint:disable-next-line:typedef
  ngOnInit() {}
}
