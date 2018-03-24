import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {AuthService} from '../../core/auth/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';
import {HelperService} from '../../core/helper.service';

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
  isAdmin = false;
  showErrorInvalidCredentials = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private helperService: HelperService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.localStorageService.remove('auth_token');
    this.isAdmin = this.checkIsAdmin();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.helperService.emailPattern)]],
      password: ['', [Validators.required]]
    });
  }

  checkIsAdmin() {
    let temp = false;
    if (this.route) {
      this.route.url.subscribe(element => {
        if (element && element.length && element.length > 1 && element[1]) {
          if (element[1].path === 'admin') {
            temp = true;
          }
        }
      });
    }
    return temp;
  }

  login(form) {
    this.loginFormSubmitted = true;
    this.isClickedOnce = !!form.valid;
    if (form.valid) {
      this.authService.login(form)
      .subscribe(response => {
        this.authService.setDataAfterLogin(response, this.remember);
        this.isClickedOnce = false;
        this.showErrorInvalidCredentials = false;
        this.router.navigate(['/main/home']);
      },
      error => {
        this.showErrorInvalidCredentials = true;
        this.isClickedOnce = false;
      });
    }
  }
}
