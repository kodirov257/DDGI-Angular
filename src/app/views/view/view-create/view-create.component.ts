import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { View } from '@app/utils/models';
import { ViewService } from '@app/utils/services';

@Component({
  selector: 'app-view-create',
  templateUrl: './view-create.component.html',
  styleUrls: ['./view-create.component.scss']
})
export class ViewCreateComponent implements OnInit, OnDestroy {
  public viewForm: FormGroup;
  submitted = false;
  error: '';
  public view: View;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private viewService: ViewService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'view-create-page');
    this.viewForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.viewForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.viewForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.viewService.create(this.f)
      .subscribe(data => {
        // this.view = data;
        // this.router.navigate(['views/' + this.view.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Saved', 'successfully');
          this.router.navigate(['views']);
        }
      }, error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'view-create-page');
  }
}
