import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Region } from '@app/utils/models';
import { RegionService } from '@app/utils/services';

@Component({
  selector: 'app-region-edit',
  templateUrl: './region-edit.component.html',
  styleUrls: ['./region-edit.component.scss']
})
export class RegionEditComponent implements OnInit, OnDestroy {
  id: number;
  public regionForm: FormGroup;
  submitted = false;
  error: '';
  public region: Region;
  public parentRegions: Region[] = [];

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private regionService: RegionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'region-edit-page');

    this.regionForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      parent_id: new FormControl(null, Validators.required),
    });

    this.getParentRegions();

    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getRegion(this.id);
    });
  }

  get f(): { [p: string]: AbstractControl } { return this.regionForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.regionForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    this.regionService.create(this.f)
      .subscribe(data => {
          // this.bank = data;
          // this.router.navigate(['regions/' + this.region.id]);
          if (data.success === false) {
            this.toastr.error(data.error_msg, data.success);
          } else {
            this.toastr.success('Updated', 'successfully');
            this.router.navigate(['regions']);
          }
        }, error => {
          this.error = error;
        }
      );
  }

  getParentRegions(): void {
    // this.parentRegions = this.regionService.getParentRegions();

    this.regionService.getParentRegions()
      .subscribe(data => {
        this.parentRegions = data.data;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'region-edit-page');
  }

  getRegion(id: number): void {
    this.regionService
      .getRegion(id)
      .subscribe(data => {
        this.region = data.data;

        this.regionForm.patchValue({
          name: this.region.name,
          parent_id: this.region.parent_id,
        });
      });
  }

}
