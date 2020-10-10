import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Group } from '@app/utils/models';
import { GroupService } from '@app/utils/services';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit, OnDestroy {
  id: number;
  public groupForm: FormGroup;
  submitted = false;
  error: '';
  public group: Group;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private groupService: GroupService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'group-edit-page');
    this.groupForm = new FormGroup({
      name: new FormControl(this.group.name, Validators.required),
    });

    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getGroup(this.id);
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.groupForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.groupForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.groupService.update(this.id, this.f)
      .subscribe(data => {
        // this.group = data.data;
        // this.router.navigate(['groups/' + this.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Updated', 'successfully');
          this.router.navigate(['groups']);
        }
      }, error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'group-edit-page');
  }

  getGroup(id: number): void {
    this.groupService
      .getGroup(id)
      .subscribe(data => {
        this.group = data.data;

        this.groupForm.patchValue({
          name: this.group.name
        });
      });
  }
}
