import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Position } from '@app/utils/models';
import { PositionService } from '@app/utils/services';

@Component({
  selector: 'app-position-edit',
  templateUrl: './position-edit.component.html',
  styleUrls: ['./position-edit.component.scss']
})
export class PositionEditComponent implements OnInit, OnDestroy {
  id: number;
  public positionForm: FormGroup;
  submitted = false;
  error: '';
  public position: Position;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private positionService: PositionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'position-edit-page');

    this.positionForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getPosition(this.id);
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.positionForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.positionForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.positionService.update(this.id, this.f)
      .subscribe(data => {
        // this.position = data.data;
        // this.router.navigate(['users/positions/' + this.position.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Updated', 'successfully');
          this.router.navigate(['users/positions']);
        }
      }, error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'position-edit-page');
  }

  getPosition(id: number): void {
    this.positionService
      .getPosition(id)
      .subscribe(data => {
        this.position = data.data;

        this.positionForm.patchValue({
          name: this.position.name,
        });
      });
  }
}
