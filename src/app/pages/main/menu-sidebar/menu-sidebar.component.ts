import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import {first} from 'rxjs/operators';

import { AppService } from 'src/app/utils/services/app.service';
import { UserService, AuthenticationService } from '../../../utils/services';
import {User} from '../../../utils/models';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss'],
})
export class MenuSidebarComponent implements OnInit, AfterViewInit {
  user: User;

  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  constructor(public userService: UserService,
              public authenticationService: AuthenticationService) {}

  ngOnInit(): void {
      this.authenticationService.currentUser.subscribe(x => this.user = x);
      // this.user = this.authService.currentUserValue;
  }

  ngAfterViewInit(): void {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }
}
