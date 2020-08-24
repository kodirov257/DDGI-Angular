import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { RoleService } from '../../../utils/services';
import { Role } from '../../../utils/models';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit, OnDestroy {
  public roleForm: FormGroup;
  submitted = false;
  error: '';
  public role: Role;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'role-create-page');
    this.roleForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      is_active: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.roleForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.roleForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.roleService.create(this.f.title.value, this.f.is_active.value)
      .subscribe(data => {
        this.role = data;
        this.router.navigate(['users/roles/' + this.role.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'role-create-page');
  }

}
