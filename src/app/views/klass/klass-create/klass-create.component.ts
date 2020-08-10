import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

import {Klass} from '../../../utils/models';
import {KlassService} from '../../../utils/services';

@Component({
  selector: 'app-klass-create',
  templateUrl: './klass-create.component.html',
  styleUrls: ['./klass-create.component.scss']
})
export class KlassCreateComponent implements OnInit, OnDestroy {
  public klassForm: FormGroup;
  submitted = false;
  error: '';
  public klass: Klass;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private klassService: KlassService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'klass-create-page');
    this.klassForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.klassForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.klassForm.invalid) {
      this.toastr.error(this.f.cr_by.errors.toString(), 'Errors!');
      return;
    }

    this.klassService.create(this.f)
      .subscribe(data => {
        this.klass = data;
        this.router.navigate(['klasses/' + this.klass.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'klass-create-page');
  }
}
