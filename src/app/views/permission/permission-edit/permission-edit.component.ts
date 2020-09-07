import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

import {Permission} from '@app/utils/models';
import {PermissionService} from '@app/utils/services';

@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
  styleUrls: ['./permission-edit.component.scss']
})
export class PermissionEditComponent implements OnInit, OnDestroy {
  id: number;
  public permissionForm: FormGroup;
  submitted = false;
  error: '';
  public permission: Permission;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private permissionService: PermissionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'permission-edit-page');
    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getPermission(this.id);

      this.permissionForm = new FormGroup({
        code_name: new FormControl(this.permission.code_name, Validators.required),
        title: new FormControl(this.permission.title, Validators.required),
      });

    });

  }

  get f(): {[p: string]: AbstractControl} { return this.permissionForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.permissionForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.permissionService.update(this.id, this.f.code_name.value, this.f.title.value)
      .subscribe(data => {
        this.permission = data.data;
        this.router.navigate(['users/permissions/' + this.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'permission-edit-page');
  }

  getPermission(id: number): void {
    this.permissionService
      .getPermission(id)
      .subscribe(data => {
        this.permission = data.data;
      });
  }
}
