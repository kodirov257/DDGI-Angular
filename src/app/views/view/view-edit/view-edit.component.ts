import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { View } from '@app/utils/models';
import { ViewService } from '@app/utils/services';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.scss']
})
export class ViewEditComponent implements OnInit, OnDestroy {
  id: number;
  public viewForm: FormGroup;
  submitted = false;
  error: '';
  public view: View;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private viewService: ViewService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'view-edit-page');

    this.viewForm = new FormGroup({
      name: new FormControl(this.view.name, Validators.required),
    });

    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getView(this.id);
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.viewForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.viewForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.viewService.update(this.id, this.f)
      .subscribe(data => {
        // this.view = data.data;
        // this.router.navigate(['views/' + this.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Updated', 'successfully');
          this.router.navigate(['views']);
        }
      }, error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'view-edit-page');
  }

  getView(id: number): void {
    this.viewService
      .getView(id)
      .subscribe(data => {
        this.view = data.data;

        this.viewForm.patchValue({
          name: this.view.name,
        });
      });
  }
}
