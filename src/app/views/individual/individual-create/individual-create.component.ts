import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Individual } from '@app/utils/models';
import { IndividualService } from '@app/utils/services';

@Component({
  selector: 'app-individual-create',
  templateUrl: './individual-create.component.html',
  styleUrls: ['./individual-create.component.scss']
})
export class IndividualCreateComponent implements OnInit, OnDestroy {
  public individualForm: FormGroup;
  submitted = false;
  error: '';
  public individual: Individual;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private individualService: IndividualService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'individual-create-page');
    this.individualForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      middle_name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone_number: new FormControl(null, Validators.required),
      passport_series: new FormControl(null, Validators.required),
      passport_number: new FormControl(null, Validators.required),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.individualForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.individualForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.individualService.create(this.f)
      .subscribe(data => {
        // this.individual = data;
        // this.router.navigate(['individuals/' + this.individual.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Created', 'successfully');
          this.router.navigate(['individuals']);
        }
      }, error => {
          this.error = error;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'individual-create-page');
  }
}
