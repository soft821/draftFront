import {Component, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import {ResponsiveService} from '../../../core/responsive/responsive.service';

export interface ConfirmModel {
  title:string;
  message:string;
  setOpponent: boolean;
  buttonText: string;
}

@Component({
  selector: 'fp-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent extends SimpleModalComponent<ConfirmModel, any> implements OnInit, ConfirmModel {
  title: string;
  message:string;
  setOpponent: boolean;
  buttonText = 'Yes';
  
  constructor(public responsiveService: ResponsiveService) {
    super();
  }

  ngOnInit() {
    
  }


  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }

}
