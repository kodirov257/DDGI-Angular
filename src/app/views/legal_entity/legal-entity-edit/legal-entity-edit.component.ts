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
    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getLegalEntity(this.id);
      this.getPosition();

      this.legalEntityForm = new FormGroup({
        name: new FormControl(this.legalEntity.name, Validators.required),
        address: new FormControl(this.legalEntity.address, Validators.required),
        phone_number: new FormControl(this.legalEntity.phone_number, Validators.required),
        position_id: new FormControl(this.legalEntity.position_id, Validators.required),
        first_name: new FormControl(this.legalEntity.first_name, Validators.required),
        last_name: new FormControl(this.legalEntity.last_name, Validators.required),
        middle_name: new FormControl(this.legalEntity.middle_name, Validators.required),
        mfo: new FormControl(this.legalEntity.mfo, Validators.required),
        inn: new FormControl(this.legalEntity.inn, Validators.required),
      });
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
        this.legalEntity = data.data;
        this.router.navigate(['legal-entities/' + this.id]);
        },
      error => {
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
