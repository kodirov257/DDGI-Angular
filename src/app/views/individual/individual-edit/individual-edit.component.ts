import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Individual } from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/models';
import { IndividualService} from '../../../../../../../Ang_Abdurahmon/DDGI-Angular/src/app/utils/services';

@Component({
  selector: 'app-individual-edit',
  templateUrl: './individual-edit.component.html',
  styleUrls: ['./individual-edit.component.scss']
})
export class IndividualEditComponent implements OnInit, OnDestroy {
  id: number;
  public individualForm: FormGroup;
  submitted = false;
  error: '';
  public individual: Individual;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private individualService: IndividualService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'individual-edit-page');
    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getIndividual(this.id);

      this.individualForm = new FormGroup({
        first_name: new FormControl(this.individual.first_name, Validators.required),
        last_name: new FormControl(this.individual.last_name, Validators.required),
        middle_name: new FormControl(this.individual.middle_name, Validators.required),
        address: new FormControl(this.individual.address, Validators.required),
        phone_number: new FormControl(this.individual.phone_number, Validators.required),
      });
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.individualForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.individualForm.invalid) {
      this.toastr.error(this.f.cr_by.errors.toString(), 'Errors!');
      return;
    }

    this.individualService.update(this.id, this.f)
      .subscribe(data => {
        this.individual = data.data;
        this.router.navigate(['individuals/' + this.id]);
        },
      error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'individual-edit-page');
  }

  getIndividual(id: number): void {
    this.individualService
      .getIndividual(id)
      .subscribe(data => {
        this.individual = data.data;
      });
  }
}
