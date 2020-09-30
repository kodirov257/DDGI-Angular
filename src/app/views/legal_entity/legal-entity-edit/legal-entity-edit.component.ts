import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { LegalEntity, Position } from '@app/utils/models';
import { LegalEntityService } from '@app/utils/services';

@Component({
  selector: 'app-legal-entity-edit',
  templateUrl: './legal-entity-edit.component.html',
  styleUrls: ['./legal-entity-edit.component.scss']
})
export class LegalEntityEditComponent implements OnInit, OnDestroy {
  id: number;
  public legalEntityForm: FormGroup;
  submitted = false;
  error: '';
  public legalEntity: LegalEntity;
  public positions: Position[];

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private legalEntityService: LegalEntityService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'legal-entity-edit-page');

    this.legalEntityForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone_number: new FormControl(null, Validators.required),
      position_id: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      middle_name: new FormControl(null, Validators.required),
      mfo: new FormControl(null, Validators.required),
      inn: new FormControl(null, Validators.required),
    });

    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getPosition();
      this.getLegalEntity(this.id);
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.legalEntityForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.legalEntityForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.legalEntityService.update(this.id, this.f)
      .subscribe(data => {
        // this.legalEntity = data.data;
        // this.router.navigate(['legal-entities/' + this.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Updated', 'successfully');
          this.router.navigate(['legal-entities']);
        }
      }, error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'legal-entity-edit-page');
  }

  getLegalEntity(id: number): void {
    this.legalEntityService
      .getLegalEntity(id)
      .subscribe(data => {
        this.legalEntity = data.data;

        this.legalEntityForm.patchValue({
          name: this.legalEntity.name,
          address: this.legalEntity.address,
          phone_number: this.legalEntity.phone_number,
          position_id: this.legalEntity.position_id,
          first_name: this.legalEntity.first_name,
          last_name: this.legalEntity.last_name,
          middle_name: this.legalEntity.middle_name,
          mfo: this.legalEntity.mfo,
          inn: this.legalEntity.inn,
        });
      });
  }

  getPosition(): void {
    this.legalEntityService
      .getPositions()
      .subscribe(data => {
        this.positions = data.data;
      });
  }
}
