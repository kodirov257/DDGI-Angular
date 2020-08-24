import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { PermissionService  } from '../../../utils/services';
import { Permission } from '../../../utils/models';

@Component({
  selector: 'app-permission-create',
  templateUrl: './permission-create.component.html',
  styleUrls: ['./permission-create.component.scss']
})
export class PermissionCreateComponent implements OnInit, OnDestroy {
  public permissionForm: FormGroup;
  submitted = false;
  error: '';
  public permission: Permission;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'permission-create-page');
    this.permissionForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      code_name: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.permissionForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.permissionForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.permissionService.create(this.f.code_name.value, this.f.title.value)
      .subscribe(data => {
        this.permission = data;
        this.router.navigate(['users/permissions/' + this.permission.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'permission-create-page');
  }

}
