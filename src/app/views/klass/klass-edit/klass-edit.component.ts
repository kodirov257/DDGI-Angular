import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Klass } from '@app/utils/models';
import { KlassService } from '@app/utils/services';

@Component({
  selector: 'app-klass-edit',
  templateUrl: './klass-edit.component.html',
  styleUrls: ['./klass-edit.component.scss']
})
export class KlassEditComponent implements OnInit, OnDestroy {
  id: number;
  public klassForm: FormGroup;
  submitted = false;
  error: '';
  public klass: Klass;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private klassService: KlassService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'klass-edit-page');

    this.klassForm = new FormGroup({
      name: new FormControl(this.klass.name, Validators.required),
    });

    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getKlass(this.id);
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.klassForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.klassForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.klassService.update(this.id, this.f)
      .subscribe(data => {
        // this.klass = data.data;
        // this.router.navigate(['klasses/' + this.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Updated', 'successfully');
          this.router.navigate(['klasses']);
        }
      }, error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'klass-edit-page');
  }

  getKlass(id: number): void {
    this.klassService
      .getKlass(id)
      .subscribe(data => {
        this.klass = data.data;

        this.klassForm.patchValue({
          name: this.klass.name,
        });
      });
  }
}
