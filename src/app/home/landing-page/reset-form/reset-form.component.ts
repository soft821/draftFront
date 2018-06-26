import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { HelperService } from '../../../core/helper.service';

@Component({
  selector: 'dm-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss']
})
export class ResetFormComponent implements OnInit {

  resetForm: FormGroup;
  resetFormSubmitted: boolean;
  resetFormSubmitInProgress: boolean;
  isClickedOnce = false;
  emailSent = false;
  errorMessage = '';
  
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private helperService: HelperService) { }


  ngOnInit() {
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
