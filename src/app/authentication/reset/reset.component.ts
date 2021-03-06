import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth/auth.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {HelperService} from '../../core/helper.service';

@Component({
  selector: 'dm-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup;
  resetFormSubmitted: boolean;
  resetFormSubmitInProgress: boolean;
  isClickedOnce = false;
  emailSent = false;
  errorMessage = '';
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private helperService: HelperService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.localStorageService.remove('auth_token');
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.helperService.emailPattern)]]
    });
  }

  resetPassword(form) {
    this.resetFormSubmitted = true;
    this.isClickedOnce = !!form.valid;
    if (form.valid) {
      this.authService.resetPassword(form)
      .subscribe(response => {
        this.isClickedOnce = false;
        this.emailSent = true;
        this.errorMessage = '';
      },
      error => {
        this.isClickedOnce = false;
        this.errorMessage = error.message;
      });
    }
  }
}
