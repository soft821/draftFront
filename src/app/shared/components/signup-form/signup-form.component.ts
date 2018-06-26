import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'dm-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  @Input() signupForm;
  @Input() signupFormSubmitted;
  @Input() isClickedOnce;
  @Input() landingPage;
  @Output() signUpEvent: EventEmitter<any> = new EventEmitter; 
  @Output() cancelSignUpEvent: EventEmitter<any> = new EventEmitter; 

  constructor() { }

  ngOnInit() {
  }

  signUp(form) {
    this.signUpEvent.emit(form);
  }

  cancelSignup() {
    this.cancelSignUpEvent.emit(false);
  }
}
