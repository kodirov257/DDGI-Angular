import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';

import { Bank, Region } from '@app/utils/models';
import { BankService } from '@app/utils/services';

@Component({
  selector: 'app-bank-edit',
  templateUrl: './bank-edit.component.html',
  styleUrls: ['./bank-edit.component.scss']
})
export class BankEditComponent implements OnInit, OnDestroy {
  id: number;
  public bankForm: FormGroup;
  submitted = false;
  error: '';
  public bank: Bank;
  public banks: Array<Select2OptionData>;
  public parentRegions: Region[];
  branchSymbols = [
    {id: 0, name: 'Марказий банкнинг таркибий бўлинмалари'},
    {id: 1, name: 'Тижорат банкларининг бош офислари'},
    {id: 2, name: 'Тижорат банкларининг тўлов марказлари'},
    {id: 3, name: 'Тижорат банкларининг филиаллари'},
  ];

  public bankChosen: boolean;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private bankService: BankService,
    private route: ActivatedRoute,
  ) {
    this.bankChosen = false;
  }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'bank-edit-page');
    this.bankForm = new FormGroup({
      branch_code: new FormControl(null, Validators.required),
      branch_symbol: new FormControl(null, Validators.required),
      bank_id: new FormControl(null, Validators.nullValidator),
      bank_name: new FormControl(null, Validators.nullValidator),
      branch_name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      founded_at: new FormControl(null, Validators.required),
      changed_at: new FormControl(null, Validators.required),
      region_id: new FormControl(null, Validators.required),
      inn: new FormControl(null, Validators.nullValidator),
      web_site: new FormControl(null, Validators.required),
    });

    this.getBanks();
    this.getRegions();

    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getBank(this.id);
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.bankForm.controls; }

  onFoundedDateSelected(event: any): void {
    this.f.founded_at.setValue(`${event.year}-${event.month}-${event.day}`);
  }

  onChangedDateSelected(event: any): void {
    this.f.founded_at.setValue(`${event.year}-${event.month}-${event.day}`);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.bankForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    if ((typeof this.f.founded_at.value) === 'object') {
      const date = this.f.founded_at.value;
      this.f.founded_at.setValue(`${date.year}-${date.month}-${date.day}`);
    }

    if ((typeof this.f.changed_at.value) === 'object') {
      const date = this.f.changed_at.value;
      this.f.changed_at.setValue(`${date.year}-${date.month}-${date.day}`);
    }

    this.bankService.update(this.id, this.f)
      .subscribe(data => {
        // this.bank = data.data;
        // this.router.navigate(['banks/' + this.id]);
        if (data.success === false) {
            this.toastr.error(data.error_msg, data.success);
          } else {
            this.toastr.success('Updated', 'successfully');
            this.router.navigate(['banks']);
          }
        }, error => {
          this.error = error;
      }
    );
  }

  getBanks(): void {
    this.banks = this.bankService.getBanks();

    // this.bankService.getBanks()
    //   .subscribe(data => {
    //     this.banks = data.data;
    //   }
    // );
  }

  getRegions(): void {
    this.parentRegions = this.bankService.getRegions();

    // this.bankService.getRegions()
    //   .subscribe(data => {
    //     this.parentRegions = data.data;
    //   }
    // );
  }

  bankSelected(value?: number): void {
    if (value) {
      this.bankChosen = true;
      this.f.bank_id.setValue(value);
    } else {
      this.bankChosen = false;
      this.f.bank_id.setValue(null);
    }
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'bank-edit-page');
  }

  getBank(id: number): void {
    this.bankService
      .getBank(id)
      .subscribe(data => {
        this.bank = data.data;

        const foundedAt = this.bank.founded_at.split('-');
        const changedAt = this.bank.changed_at.split('-');

        if (this.bank.bank_id) {
          this.bankChosen = true;
        }

        this.bankForm.patchValue({
          branch_code: this.bank.branch_code,
          branch_symbol: this.bank.branch_symbol,
          bank_id: this.bank.bank_id,
          branch_name: this.bank.branch_name,
          address: this.bank.address,
          founded_at: {year: +foundedAt[0], month: +foundedAt[1], day: +foundedAt[2]},
          changed_at: {year: +changedAt[0], month: +changedAt[1], day: +changedAt[2]},
          region_id: this.bank.region_id,
          inn: this.bank.inn,
          web_site: this.bank.web_site,
        });
      });
  }
}
