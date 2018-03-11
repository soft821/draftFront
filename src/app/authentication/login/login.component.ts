import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {AuthService} from '../../core/auth/auth.service';
import {Router} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'dm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormSubmitted: boolean;
  loginFormSubmitInProgress: boolean;
  isClickedOnce = false;
  remember: boolean;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.localStorageService.remove('auth_token');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(form) {
    this.loginFormSubmitted = true;
    this.isClickedOnce = !!form.valid;
    if(form.valid) {
      this.authService.login(form)
      .subscribe(response => {
        this.authService.setDataAfterLogin(response, this.remember);
        this.isClickedOnce = false;
        this.router.navigate(['/main/home'])
      },
      error => {
        this.isClickedOnce = false;
      })  
    }
  };
}
