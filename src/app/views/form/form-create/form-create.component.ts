import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Observable } from 'rxjs';

import {FormService, ProductFieldFormService} from '@app/utils/services';
import { Form, Policy } from '@app/utils/models';
import { DynamicFormBase } from '@app/utils/forms';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent implements OnInit, OnDestroy {
  public worksheetForm: FormGroup;
  public insurerForm: FormGroup;
  public beneficiaryForm: FormGroup;
  public pledgerForm: FormGroup;
  public productForm: FormGroup;
  public contractForm: FormGroup;
  public policyForm: FormGroup;

  formSubmitted = false;
  contractSubmitted = false;
  policySubmitted = false;
  error: '';
  productFields: DynamicFormBase<any>[];
  productName: string;

  public worksheet: Form;
  public contract: any;
  public policy: Policy;
  public products: Array<Select2OptionData>;
  // public insurers: Observable<Array<Select2OptionData>>;
  public insurers: Array<Select2OptionData>;
  public beneficiaries: Array<Select2OptionData>;
  public pledgers: Array<Select2OptionData>;
  public banks: Array<Select2OptionData>;
  public insuranceRisks: Array<Select2OptionData>;

  // public insurer_id: number|null = null;
  // public beneficiary_id: number|null = null;
  // public pledger_id: number|null = null;
  // public insurer_bank_id: number|null = null;
  // public beneficiary_bank_id: number|null = null;
  // public pledger_bank_id: number|null = null;
  // public insurer_bank_name: string|null = null;
  // public beneficiary_bank_name: string|null = null;
  // public pledger_bank_name: string|null = null;

  public productChosen: boolean;
  public insurerChosen: boolean;
  public beneficiaryChosen: boolean;
  public pledgerChosen: boolean;
  public insurerBankChosen: boolean;
  public beneficiaryBankChosen: boolean;
  public pledgerBankChosen: boolean;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private formService: FormService,
    private productFieldFormService: ProductFieldFormService,
  ) {
    this.productChosen = false;
    this.insurerChosen = false;
    this.beneficiaryChosen = false;
    this.pledgerChosen = false;
    this.insurerBankChosen = false;
    this.beneficiaryBankChosen = false;
    this.pledgerBankChosen = false;
    this.productName = '';
  }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'form-create-page');

    this.worksheetForm = new FormGroup({
      // beneficiary_id: new FormControl(null, Validators.required),
      form_type: new FormControl(null, Validators.required),
      date_from: new FormControl(null, Validators.required),
      date_to: new FormControl(null, Validators.required),
      insurance_agreement: new FormControl(null, Validators.required),
      goal: new FormControl(null, Validators.required),
      zone: new FormControl(null, Validators.required),
      is_damaged: new FormControl(null, Validators.required),
      is_insured: new FormControl(null, Validators.required),
      risk: new FormControl(null, Validators.required),
      insurance_sum: new FormControl(null, Validators.required),
      payment_currency: new FormControl(null, Validators.required),
      payment_type: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.nullValidator),

      // property_name: new FormControl(null, Validators.required),
      // client_id: new FormControl(null, Validators.required),
      client_type: new FormControl(null, Validators.required),
      // client_checking_account: new FormControl(null, Validators.required),
      // region_id: new FormControl(null, Validators.required),
      // quantity: new FormControl(null, Validators.required),
      // insurance_cost: new FormControl(null, Validators.required),
      // anti_fire_stuff: new FormControl(null, Validators.required),
      // security_stuff: new FormControl(null, Validators.required),
      // insurer_id: new FormControl(null, Validators.required),
    });

    this.makeInsurerForm(false);
    this.makePledgerForm(false);
    this.makeBeneficiaryForm(false);

    this.contractForm = new FormGroup({
      contract_number: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
    });

    this.policyForm = new FormGroup({

    });

    this.getProducts();
    this.getInsurers();
    this.getBeneficiaries();
    this.getPledgers();
    this.getBanks();
    this.getInsuranceRisks();
  }

  makeInsurerForm(required?: boolean): void {
    const validator = required ? Validators.required : Validators.nullValidator;
    this.insurerForm = new FormGroup({
      id: new FormControl(null, Validators.nullValidator),
      first_name: new FormControl(null, validator),
      last_name: new FormControl(null, validator),
      middle_name: new FormControl(null, validator),
      address: new FormControl(null, validator),
      phone_number: new FormControl(null, validator),
      fax_number: new FormControl(null, validator),
      checking_account: new FormControl(null, validator),
      bank_id: new FormControl(null, Validators.nullValidator),
      bank_name: new FormControl(null, Validators.required),
      inn: new FormControl(null, validator),
      mfo: new FormControl(null, validator),
    });
  }

  makeBeneficiaryForm(required?: boolean): void {
    const validator = required ? Validators.required : Validators.nullValidator;
    this.beneficiaryForm = new FormGroup({
      id: new FormControl(null, Validators.nullValidator),
      first_name: new FormControl(null, validator),
      last_name: new FormControl(null, validator),
      middle_name: new FormControl(null, validator),
      address: new FormControl(null, validator),
      phone_number: new FormControl(null, validator),
      fax_number: new FormControl(null, validator),
      checking_account: new FormControl(null, validator),
      bank_id: new FormControl(null, Validators.nullValidator),
      bank_name: new FormControl(null, Validators.required),
      inn: new FormControl(null, validator),
      mfo: new FormControl(null, validator),
    });
  }

  makePledgerForm(required?: boolean): void {
    const validator = required ? Validators.required : Validators.nullValidator;
    this.pledgerForm = new FormGroup({
      id: new FormControl(null, Validators.nullValidator),
      first_name: new FormControl(null, validator),
      last_name: new FormControl(null, validator),
      middle_name: new FormControl(null, validator),
      address: new FormControl(null, validator),
      phone_number: new FormControl(null, validator),
      fax_number: new FormControl(null, validator),
      checking_account: new FormControl(null, validator),
      bank_id: new FormControl(null, Validators.nullValidator),
      bank_name: new FormControl(null, Validators.required),
      inn: new FormControl(null, validator),
      mfo: new FormControl(null, validator),
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.worksheetForm.controls; }

  get insurerF(): {[p: string]: AbstractControl} { return this.insurerForm.controls; }
  get beneficiaryF(): {[p: string]: AbstractControl} { return this.beneficiaryForm.controls; }
  get pledgerF(): {[p: string]: AbstractControl} { return this.pledgerForm.controls; }
  get productF(): {[p: string]: AbstractControl} { return this.productForm.controls; }

  onFormSubmit(): void {
    this.formSubmitted = true;

    if (this.worksheetForm.invalid) {
      this.toastr.error('Form Error!', 'Form Errors!');
      return;
    }

    this.formService.create(this.f, this.insurerF, this.beneficiaryF, this.pledgerF, this.productF)
      .subscribe(data => {
        this.worksheet = data;
        this.router.navigate(['forms/' + this.worksheet.id]);
      }, error => {
        this.error = error;
      }
    );
  }

  onContractSubmit(): void {
    this.contractSubmitted = true;

    if (this.contractForm.invalid) {
      this.toastr.error('Contract Error!', 'Contract Errors!');
      return;
    }

    // this.formService.create(this.f)
    //   .subscribe(data => {
    //     this.contract = data;
    //     this.router.navigate(['contracts/' + this.contract.id]);
    //     },
    //   error => {
    //       this.error = error;
    //   }
    // );
  }

  onPolicySubmit(): void {
    this.contractSubmitted = true;

    if (this.contractForm.invalid) {
      this.toastr.error('Contract Error!', 'Contract Errors!');
      return;
    }

    // this.formService.create(this.f)
    //   .subscribe(data => {
    //     this.policy = data;
    //     this.router.navigate(['policies/' + this.policy.id]);
    //     },
    //   error => {
    //       this.error = error;
    //   }
    // );
  }

  getProducts(): void {
    this.products = this.formService.getProducts();

    // this.formService
    //   .getProducts()
    //   .subscribe(data => {
    //     this.products = data.data;
    //   });
  }

  getInsurers(): void {
    this.insurers = this.formService.getInsurers(1);
    // console.log(this.insurers);

    // this.formService.getInsurers(1)
    //   .pipe(delay(4000))
    //   .subscribe(data => {
    //     this.insurers = data.data;
    //   }
    // );
  }

  getBeneficiaries(): void {
    this.beneficiaries = this.formService.getBeneficiaries();
    this.beneficiaries.unshift({id: '', text: ''});

    // this.formService.getInsurers(1)
    //   .subscribe(data => {
    //     this.insurers = data.data;
    //   }
    // );
  }

  getPledgers(): void {
    this.pledgers = this.formService.getPledgers();

    // this.formService.getInsurers(1)
    //   .subscribe(data => {
    //     this.insurers = data.data;
    //   }
    // );
  }

  getBanks(): void {
    this.banks = this.formService.getBanks();

    // this.formService.getBanks()
    //   .subscribe(data => {
    //     this.banks = data.data;
    //   }
    // );
  }

  getInsuranceRisks(): void {
    this.insuranceRisks = this.formService.getInsuranceRisks();

    // this.formService.getInsuranceRisks()
    //   .subscribe(data => {
    //     this.insuranceRisks = data.data;
    //   }
    // );

  }

  getProductFields(productId: number): void {
    this.productFields = this.formService.getProductFields(productId);
    this.productForm = this.productFieldFormService.toFormGroup(this.productFields);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'form-create-page');
  }

  productSelected(event: string): void {
    // this.worksheetForm.controls.client_type.setValue(event);
    if (event) {
      this.getProductFields(+event);
      this.productChosen = true;
      this.productName = this.products[+event - 1].text;
    } else {
      this.productChosen = false;
      this.productName = '';
    }
  }

  insurerBankSelected(value?: number): void {
    if (value) {
      this.insurerBankChosen = true;
      this.insurerF.bank_id.setValue(value);
      // this.insurer_bank_id = value;
    } else {
      this.insurerBankChosen = false;
      this.insurerF.bank_id.setValue(null);
      // this.insurer_bank_id = null;
    }
  }

  beneficiaryBankSelected(value?: number): void {
    if (value) {
      this.beneficiaryBankChosen = true;
      this.beneficiaryF.bank_id.setValue(value);
      // this.beneficiary_bank_id = value;
    } else {
      this.beneficiaryBankChosen = false;
      this.beneficiaryF.bank_id.setValue(null);
      // this.beneficiary_bank_id = null;
    }
  }

  pledgerBankSelected(value?: number): void {
    if (value) {
      this.pledgerBankChosen = true;
      this.pledgerF.bank_id.setValue(value);
      // this.pledger_bank_id = value;
    } else {
      this.pledgerChosen = false;
      this.pledgerF.bank_id.setValue(null);
      // this.pledger_bank_id = null;
    }
  }

  insurerSelected(value?: number): void {
    if (value) {
      this.insurerChosen = true;
      this.insurerF.id.setValue(value);
      // this.insurer_id = value;
    } else {
      this.insurerChosen = false;
      this.insurerF.id.setValue(value);
      // this.insurer_id = null;
    }
  }

  beneficiarySelected(value?: number): void {
    if (value) {
      this.beneficiaryChosen = true;
      this.beneficiaryF.id.setValue(value);
      // this.beneficiary_id = value;
    } else {
      this.beneficiaryChosen = false;
      this.beneficiaryF.id.setValue(null);
      // this.beneficiary_id = null;
    }
  }

  pledgerSelected(value?: number): void {
    if (value) {
      this.pledgerChosen = true;
      this.pledgerF.id.setValue(value);
      // this.pledger_id = value;
    } else {
      this.pledgerChosen = false;
      this.pledgerF.id.setValue(null);
      // this.pledger_id = null;
    }
  }

  clientTypeChecked(value: number): void {
    this.worksheetForm.controls.client_type.setValue(value);
    // this.insurers = this.formService.getInsurers(value);
  }

  isDamageChecked(value: boolean): void {
    this.worksheetForm.controls.is_damaged.setValue(value);
  }

  isInsuredChecked(value: boolean): void {
    this.worksheetForm.controls.is_insured.setValue(value);
  }

  isPaymentSequenceChecked(value: number): void {
    this.worksheetForm.controls.payment_type.setValue(value);
  }

  printForm(): void {

  }

  printAgreement(): void {

  }

  printPolicy(): void {

  }
}
