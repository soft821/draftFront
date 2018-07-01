import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'dm-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.scss']
})
export class SupportFormComponent implements OnInit {

  @Output() showSignupForm: EventEmitter<any> = new EventEmitter;
  constructor() { }

  ngOnInit() {
  }

  showSignup() {
    this.showSignupForm.emit(true);
  }

  goToIndiegogo() {
    window.open('https://igg.me/at/draftmatch/x/18671044', '_blank');
  }
}
