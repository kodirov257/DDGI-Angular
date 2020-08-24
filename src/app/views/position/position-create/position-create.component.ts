import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Position } from '../../../utils/models';
import { PositionService } from '../../../utils/services';

@Component({
  selector: 'app-position-create',
  templateUrl: './position-create.component.html',
  styleUrls: ['./position-create.component.scss']
})
export class PositionCreateComponent implements OnInit, OnDestroy {
  public positionForm: FormGroup;
  submitted = false;
  error: '';
  public position: Position;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private positionService: PositionService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'position-create-page');
    this.positionForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.positionForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.positionForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.positionService.create(this.f)
      .subscribe(data => {
        this.position = data;
        this.router.navigate(['users/positions/' + this.position.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'position-create-page');
  }
}
