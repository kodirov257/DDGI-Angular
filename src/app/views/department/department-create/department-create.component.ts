import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Department } from '@app/utils/models';
import { DepartmentService} from '@app/utils/services';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.scss']
})
export class DepartmentCreateComponent implements OnInit, OnDestroy {
  public departmentForm: FormGroup;
  submitted = false;
  error: '';
  public department: Department;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private departmentService: DepartmentService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'department-create-page');
    this.departmentForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      branch_id: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.departmentForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.departmentForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.departmentService.create(this.f)
      .subscribe(data => {
        // this.department = data;
        // this.router.navigate(['departments/' + this.department.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Created', 'successfully');
          this.router.navigate(['departments']);
        }
      }, error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'department-create-page');
  }
}
