import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Individual } from '@app/utils/models';
import { IndividualService} from '@app/utils/services';

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

    this.individualForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      middle_name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone_number: new FormControl(null, Validators.required),
      passport_series: new FormControl(null, Validators.required),
      passport_number: new FormControl(null, Validators.required),
    });

    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getIndividual(this.id);
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.individualForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.individualForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.individualService.update(this.id, this.f)
      .subscribe(data => {
        // this.individual = data.data;
        // this.router.navigate(['individuals/' + this.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Updated', 'successfully');
          this.router.navigate(['individuals']);
        }
      }, error => {
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

        this.individualForm.patchValue({
          first_name: this.individual.first_name,
          last_name: this.individual.last_name,
          middle_name: this.individual.middle_name,
          address: this.individual.address,
          phone_number: this.individual.phone_number,
          passport_series: this.individual.passport_series,
          passport_number: this.individual.passport_number,
        });
      });
  }
}
