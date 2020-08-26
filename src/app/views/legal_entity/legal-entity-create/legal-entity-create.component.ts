import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { LegalEntity } from '../../../utils/models';
import { LegalEntityService } from '../../../utils/services';

@Component({
  selector: 'app-legal-entity-create',
  templateUrl: './legal-entity-create.component.html',
  styleUrls: ['./legal-entity-create.component.scss']
})
export class LegalEntityCreateComponent implements OnInit, OnDestroy {
  public legalEntityForm: FormGroup;
  submitted = false;
  error: '';
  public legalEntity: LegalEntity;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private legalEntityService: LegalEntityService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'legal-entity-create-page');
    this.legalEntityForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone_number: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      middle_name: new FormControl(null, Validators.required),
      mfo: new FormControl(null, Validators.required),
      inn: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.legalEntityForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.legalEntityForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.legalEntityService.create(this.f)
      .subscribe(data => {
        this.legalEntity = data;
        this.router.navigate(['legal-entities/' + this.legalEntity.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'legal-entity-create-page');
  }
}
