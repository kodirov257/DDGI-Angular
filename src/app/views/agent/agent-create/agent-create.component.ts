import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AgentService } from '@app/utils/services';
import { Agent } from '@app/utils/models';

@Component({
  selector: 'app-agent-create',
  templateUrl: './agent-create.component.html',
  styleUrls: ['./agent-create.component.scss']
})
export class AgentCreateComponent implements OnInit, OnDestroy {
public agentForm: FormGroup;
  submitted = false;
  error: '';
  public agent: Agent;
  public banks/*: Region[]*/: {id: number, name: string}[];
  public statuses = [
    {id: 0, name: 'Inactive'},
    {id: 1, name: 'Active'},
  ];

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private agentService: AgentService,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'agent-create-page');
    this.agentForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phone_number: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      agreement: new FormControl(null, Validators.required),
      agreed_at: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      checking_account: new FormControl(null, Validators.required),
      bank_id: new FormControl(null, Validators.required),
      mfo: new FormControl(null, Validators.required),
      inn: new FormControl(null, Validators.required),
      certificate: new FormControl(null, Validators.required),
      certificate_from: new FormControl(null, Validators.required),
      certificate_to: new FormControl(null, Validators.required),
      passport_series: new FormControl(null, Validators.required),
      passport_number: new FormControl(null, Validators.required),
      passport_given_at: new FormControl(null, Validators.required),
    });

    this.getBanks();
  }

  get f(): { [p: string]: AbstractControl } { return this.agentForm.controls; }

  onAgreedDateSelected(event: any): void {
    this.f.agreed_at.setValue(`${event.year}-${event.month}-${event.day}`);
  }

  onCertificateFromDateSelected(event: any): void {
    this.f.certificate_from.setValue(`${event.year}-${event.month}-${event.day}`);
  }

  onCertificateToDateSelected(event: any): void {
    this.f.certificate_to.setValue(`${event.year}-${event.month}-${event.day}`);
  }

  onPassportGivenDateSelected(event: any): void {
    this.f.passport_given_at.setValue(`${event.year}-${event.month}-${event.day}`);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.agentForm.invalid) {
      this.toastr.error('Error!', 'Errors!');
      return;
    }

    if ((typeof this.f.agreed_at.value) === 'object') {
      const date = this.f.agreed_at.value;
      this.f.agreed_at.setValue(`${date.year}-${date.month}-${date.day}`);
    }

    if ((typeof this.f.certificate_from.value) === 'object') {
      const date = this.f.certificate_from.value;
      this.f.certificate_from.setValue(`${date.year}-${date.month}-${date.day}`);
    }

    if ((typeof this.f.certificate_to.value) === 'object') {
      const date = this.f.certificate_to.value;
      this.f.certificate_to.setValue(`${date.year}-${date.month}-${date.day}`);
    }

    if ((typeof this.f.passport_given_at.value) === 'object') {
      const date = this.f.passport_given_at.value;
      this.f.passport_given_at.setValue(`${date.year}-${date.month}-${date.day}`);
    }

    this.agentService.create(this.f)
      .subscribe(data => {
        // this.agent = data.data;
        // this.router.navigate(['agents/' + this.bank.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Saved', 'successfully');
          this.router.navigate(['agents']);
        }
      }, error => {
        this.error = error;
      }
    );
  }

  getBanks(): void {
    this.banks = this.agentService.getBanks();

    // this.bankService.getRegions()
    //   .subscribe(data => {
    //     this.parentRegions = data.data;
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'agent-create-page');
  }
}
