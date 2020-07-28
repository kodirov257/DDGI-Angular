import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../../utils/services';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isAuthLoading = false;
  submitted = false;
  public returnUrl: string;
  error = '';

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f(): {[p: string]: AbstractControl} { return this.loginForm.controls; }

  login(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.toastr.error('Hello world!', 'Toastr fun!');
      return;
    }

    this.isAuthLoading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first()).subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
      error => {
          this.error = error;
          this.isAuthLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
