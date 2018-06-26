import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth/auth.service';
import {HelperService} from '../../core/helper.service';

@Component({
  selector: 'dm-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  signupForm: FormGroup;
  signupFormSubmitted: boolean;
  signupFormSubmitInProgress: boolean;
  isClickedOnce = false;
  showSupportForm: boolean;
  showSignupForm: boolean;
  showReset: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private helperService: HelperService) { }

  ngOnInit() {
  //  this.localStorageService.remove('auth_token'); logged user should never get here - redirect to lobby
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.helperService.emailPattern)]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      promoCode: ['']
    });
  }

  showSignup(event) {
    this.showSignupForm = event;
    this.showSupportForm = false;
  }

  cancelSignup(event) {
    this.showSignupForm = event;
    this.showSupportForm = event;
  }

  signUp(form) {
    this.signupFormSubmitted = true;
    this.isClickedOnce = !!form.valid;
    if (form.valid) {
      this.authService.signUp(form)
      .subscribe(response => {
        this.authService.setDataAfterLogin(response);
        this.isClickedOnce = false;
        this.router.navigate(['main/lobby']);
      },
      error => {
        this.isClickedOnce = false;
      });
    }
  }

  showResetForm(event) {
    this.showReset = true;
    this.showSignupForm = false;
    this.showSupportForm = false;
  }
}
