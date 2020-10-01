import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';

import { BankService } from '@app/utils/services';
import { Bank, Region } from '@app/utils/models';

@Component({
  selector: 'app-bank-create',
  templateUrl: './bank-create.component.html',
  styleUrls: ['./bank-create.component.scss']
})
export class BankCreateComponent implements OnInit, OnDestroy {
  public bankForm: FormGroup;
  submitted = false;
  error: '';
  public bank: Bank;
  public banks: Array<Select2OptionData>;
  public parentRegions/*: Region[]*/: {id: number, name: string}[];
  branchSymbols = [
    { id: 0, name: 'Марказий банкнинг таркибий бўлинмалари' },
    { id: 1, name: 'Тижорат банкларининг бош офислари' },
    { id: 2, name: 'Тижорат банкларининг тўлов марказлари' },
    { id: 3, name: 'Тижорат банкларининг филиаллари' },
  ];

  @ViewChild('regions') regionsDiv: ElementRef;

  public bankChosen: boolean;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private bankService: BankService,
  ) {
    this.bankChosen = false;
  }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'bank-create-page');
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
  }

  get f(): { [p: string]: AbstractControl } { return this.bankForm.controls; }

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

    this.bankService.create(this.f)
      .subscribe(data => {
          // this.bank = data;
          // this.router.navigate(['banks/' + this.bank.id]);
          if (data.success === false) {
            this.toastr.error(data.error_msg, data.success);
          } else {
            this.toastr.success('Saved', 'successfully');
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
    this.renderer.removeClass(document.querySelector('app-root'), 'bank-create-page');
  }
}
