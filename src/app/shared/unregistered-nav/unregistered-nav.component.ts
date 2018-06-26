import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from '../../core/helper.service';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dm-unregistered-nav',
  templateUrl: './unregistered-nav.component.html',
  styleUrls: ['./unregistered-nav.component.scss']
})
export class UnregisteredNavComponent implements OnInit {
  @Output() showResetForm: EventEmitter<any> = new EventEmitter
  constructor(private helperService: HelperService,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  loginForm: FormGroup;
  loginFormSubmitted: boolean;
  loginFormSubmitInProgress: boolean;
  isClickedOnce = false;
  showErrorInvalidCredentials: boolean;
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.helperService.emailPattern)]],
      password: ['', [Validators.required]]
    });
  }

  goToReset() {
    this.showResetForm.emit();
  }

  login(form) {
    this.loginFormSubmitted = true;
    this.isClickedOnce = !!form.valid;
    if (form.valid) {
      this.authService.login(form)
      .subscribe(response => {
        this.authService.setDataAfterLogin(response);
        this.isClickedOnce = false;
        this.showErrorInvalidCredentials = false;
        this.router.navigate(['/main/lobby']);
      },
      error => {
        this.showErrorInvalidCredentials = true;
        this.isClickedOnce = false;
      });
    }
  }
}
