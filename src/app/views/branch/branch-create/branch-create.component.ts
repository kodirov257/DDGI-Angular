import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Branch } from '@app/utils/models';
import { BranchService } from '@app/utils/services';

@Component({
  selector: 'app-branch-create',
  templateUrl: './branch-create.component.html',
  styleUrls: ['./branch-create.component.scss']
})
export class BranchCreateComponent implements OnInit, OnDestroy {
  public branchForm: FormGroup;
  submitted = false;
  error: '';
  public branch: Branch;
  public parentRegions/*: Region[]*/: {id: number, name: string}[];
  types = [
    { id: 0, name: 'Количество территориальных подразделений (ед.)' },
    { id: 1, name: 'Количество территориальных подразделений открытых в отчетном периоде (ед.)' },
    // { id: 2, name: 'Тижорат банкларининг тўлов марказлари' },
    // { id: 3, name: 'Тижорат банкларининг филиаллари' },
  ];

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private branchService: BranchService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'branch-create-page');
    this.branchForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      region_id: new FormControl(null, Validators.required),
      founded_at: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      middle_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      telephone_number: new FormControl(null, Validators.required),
      mobile_phone_number: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });

    this.getRegions();
  }

  get f(): { [p: string]: AbstractControl } { return this.branchForm.controls; }

  onFoundedDateSelected(event: any): void {
    this.f.founded_at.setValue(`${event.year}-${event.month}-${event.day}`);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.branchForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    if ((typeof this.f.founded_at.value) === 'object') {
      const date = this.f.founded_at.value;
      this.f.founded_at.setValue(`${date.year}-${date.month}-${date.day}`);
    }

    this.branchService.create(this.f)
      .subscribe(data => {
        // this.bank = data;
        // this.router.navigate(['branches/' + this.bank.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Saved', 'successfully');
          this.router.navigate(['branches']);
        }
      }, error => {
        this.error = error;
      }
    );
  }

  getRegions(): void {
    this.parentRegions = this.branchService.getRegions();

    // this.bankService.getRegions()
    //   .subscribe(data => {
    //     this.parentRegions = data.data;
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'branch-create-page');
  }

}
