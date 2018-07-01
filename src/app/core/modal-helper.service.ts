import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {SimpleModalService} from 'ngx-simple-modal';
import { ConfirmationModalComponent } from '../shared/alert-modals/confirmation-modal/confirmation-modal.component';

@Injectable()
export class ModalHelperService {
  modalOpened: boolean;

  constructor(public spinner: NgxSpinnerService,
              private simpleModalService: SimpleModalService) {}

  showConfirmationMessage(message, title, description?) {
    this.modalOpened = true;
    this.simpleModalService.addModal(ConfirmationModalComponent, {
        title: title,
        message: message,
        description: description,
        buttonText: 'OK'
    })
    .subscribe((isConfirmed)=> {      
      this.modalOpened = false;
    });
  }
}