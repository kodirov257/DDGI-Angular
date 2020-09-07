import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

import {RoleService} from '@app/utils/services';
import {Role} from '@app/utils/models';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit, OnDestroy {
  id: number;
  public roleForm: FormGroup;
  submitted = false;
  error: '';
  public role: Role;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private roleService: RoleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'role-edit-page');
    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getRole(this.id);

      this.roleForm = new FormGroup({
        title: new FormControl(this.role.title, Validators.required),
        is_active: new FormControl(this.role.is_active, Validators.required),
      });
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.roleForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.roleForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.roleService.update(this.id, this.f.code_name.value, this.f.title.value)
      .subscribe(data => {
        this.role = data.data;
        this.router.navigate(['users/roles/' + this.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'role-edit-page');
  }

  getRole(id: number): void {
    this.roleService
      .getRole(id)
      .subscribe(data => {
        this.role = data.data;
      });
  }
}
