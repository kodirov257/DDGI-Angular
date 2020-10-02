import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Agent } from '@app/utils/models';
import { AgentService } from '@app/utils/services';

@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.scss']
})
export class AgentEditComponent implements OnInit, OnDestroy {
id: number;
  public agentForm: FormGroup;
  submitted = false;
  error: '';
  public agent: Agent;
  public banks/*: Region[]*/: {id: number, name: string}[];
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private agentService: AgentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'agent-edit-page');

    this.agentForm = new FormGroup({
      name: new FormControl(null, Validators.required),
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

    this.route.params.subscribe(params => {
      this.id = +params.id;

      this.getAgent(this.id);
    });
  }

  get f(): {[p: string]: AbstractControl} { return this.agentForm.controls; }

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

    this.agentService.update(this.id, this.f)
      .subscribe(data => {
        // this.agent = data.data;
        // this.router.navigate(['agents/' + this.id]);
        if (data.success === false) {
          this.toastr.error(data.error_msg, data.success);
        } else {
          this.toastr.success('Updated', 'successfully');
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
    this.renderer.removeClass(document.querySelector('app-root'), 'agent-edit-page');
  }

  getAgent(id: number): void {
    this.agentService
      .getAgent(id)
      .subscribe(data => {
        this.agent = data.data;

        const agreedAt = this.agent.agreed_at.split('-');
        const certificateFrom = this.agent.certificate_from.split('-');
        const certificateTo = this.agent.certificate_to.split('-');
        const passportGivenAt = this.agent.passport_given_at.split('-');

        this.agentForm.patchValue({
          name: this.agent.name,
          agreement: this.agent.agreement,
          agreed_at: {year: +agreedAt[0], month: +agreedAt[1], day: +agreedAt[2]},
          address: this.agent.address,
          checking_account: this.agent.checking_account,
          bank_id: this.agent.bank_id,
          mfo: this.agent.mfo,
          inn: this.agent.inn,
          certificate: this.agent.certificate,
          certificate_from: {year: +certificateFrom[0], month: +certificateFrom[1], day: +certificateFrom[2]},
          certificate_to: {year: +certificateTo[0], month: +certificateTo[1], day: +certificateTo[2]},
          passport_series: this.agent.passport_series,
          passport_number: this.agent.passport_number,
          passport_given_at: {year: +passportGivenAt[0], month: +passportGivenAt[1], day: +passportGivenAt[2]},
        });
      });
  }
}
