import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/services';
import { User } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/models';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  id: number;
  public userForm: FormGroup;
  submitted = false;
  error: '';
  public user: User;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'user-edit-page');
    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getUser(this.id);

      this.userForm = new FormGroup({
        // username: new FormControl(this.user.username, Validators.required),
        // password: new FormControl(null, Validators.required),
        // first_name: new FormControl(this.user.first_name, Validators.required),
        // last_name: new FormControl(this.user.last_name, Validators.required),
        // position_id: new FormControl(this.user.position_id, Validators.required),
        // status: new FormControl(this.user.status, Validators.required),
        // image: new FormControl(this.user.image, Validators.required),
      });
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.userForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.invalid) {
      this.toastr.error(this.f.cr_by.errors.toString(), 'Errors!');
      return;
    }

    this.userService.update(this.id, this.f)
      .subscribe(data => {
        this.user = data.data;
        this.router.navigate(['users/' + this.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'user-edit-page');
  }

  getUser(id: number): void {
    this.userService
      .getUser(id)
      .subscribe(data => {
        this.user = data.data;
      });
  }
}
