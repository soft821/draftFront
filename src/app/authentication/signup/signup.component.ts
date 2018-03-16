import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {AuthService} from '../../core/auth/auth.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {Router} from '@angular/router';
import {HelperService} from '../../core/helper.service';

@Component({
  selector: 'dm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signupFormSubmitted: boolean;
  signupFormSubmitInProgress: boolean;
  isClickedOnce = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private helperService: HelperService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.localStorageService.remove('auth_token');
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.helperService.emailPattern)]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      promoCode: ['']
    });
  }

  signUp(form) {
    this.signupFormSubmitted = true;
    this.isClickedOnce = !!form.valid;
    if(form.valid) {
      this.authService.signUp(form)
      .subscribe(response => {
        this.authService.setDataAfterLogin(response);
        this.isClickedOnce = false;
        this.router.navigate(['/main/home'])
      },
      error => {
        this.isClickedOnce = false;
      })
    }
  };
}
