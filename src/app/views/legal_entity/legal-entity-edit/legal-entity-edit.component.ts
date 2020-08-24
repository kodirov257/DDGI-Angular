import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { LegalEntityService } from '../../../utils/services';
import { LegalEntity } from '../../../utils/models';

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

      this.legalEntityForm = new FormGroup({
        name: new FormControl(this.legalEntity.name, Validators.required),
        address: new FormControl(this.legalEntity.address, Validators.required),
        phone_number: new FormControl(this.legalEntity.phone_number, Validators.required),
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
}
