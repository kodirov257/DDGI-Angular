import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Branch } from '@app/utils/models';
import { BranchService } from '@app/utils/services';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.scss']
})
export class BranchEditComponent implements OnInit, OnDestroy {
  id: number;
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
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'branch-edit-page');

    this.branchForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      region_id: new FormControl(null, Validators.required),
      founded_at: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      middle_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      agreement_number: new FormControl(null, Validators.required),
      agreed_at: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      telephone_number: new FormControl(null, Validators.required),
      mobile_phone_number: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });

    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getBranch(this.id);
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.branchForm.controls; }

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

    this.branchService.update(this.id, this.f)
      .subscribe(data => {
        // this.branch = data.data;
        // this.router.navigate(['branches/' + this.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Updated', 'successfully');
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
    this.renderer.removeClass(document.querySelector('app-root'), 'branch-edit-page');
  }

  getBranch(id: number): void {
    this.branchService
      .getBranch(id)
      .subscribe(data => {
        this.branch = data.data;

        const foundedAt = this.branch.founded_at.split('-');
        const agreedAt = this.branch.agreed_at.split('-');

        this.branchForm.patchValue({
          name: this.branch.name,
          region_id: this.branch.region_id,
          founded_at: {year: +foundedAt[0], month: +foundedAt[1], day: +foundedAt[2]},
          first_name: this.branch.first_name,
          middle_name: this.branch.middle_name,
          last_name: this.branch.last_name,
          agreement_number: this.branch.agreement_number,
          agreed_at: {year: +agreedAt[0], month: +agreedAt[1], day: +agreedAt[2]},
          address: this.branch.address,
          telephone_number: this.branch.telephone_number,
          mobile_phone_number: this.branch.mobile_phone_number,
          type: this.branch.type,
        });
      });
  }
}
