import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Group } from '../../../utils/models';
import { GroupService } from '../../../utils/services';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent implements OnInit, OnDestroy {
  public groupForm: FormGroup;
  submitted = false;
  error: '';
  public group: Group;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private groupService: GroupService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'group-create-page');
    this.groupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.groupForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.groupForm.invalid) {
      this.toastr.error(this.f.cr_by.errors.toString(), 'Errors!');
      return;
    }

    this.groupService.create(this.f)
      .subscribe(data => {
        this.group = data;
        this.router.navigate(['groups/' + this.group.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'group-create-page');
  }
}
