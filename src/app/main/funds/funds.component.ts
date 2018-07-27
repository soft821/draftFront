import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SimpleModalService} from 'ngx-simple-modal';
import {ConfirmationModalComponent} from '../../shared/alert-modals/confirmation-modal/confirmation-modal.component';
import {ModalHelperService} from '../../core/modal-helper.service';
import {HelperService} from '../../core/helper.service';
import {AuthService} from '../../core/auth/auth.service';

@Component({
  selector: 'dm-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit {

  @Input() type = 'addFunds';
  @Input() items;
  @Input() title;
  @Input() subtitle;
  @Input() customAmount;
  @Input() myLocation;
  @Input() paymentSubmitted;
  @Output() addWithdrawFunds: EventEmitter<any> = new EventEmitter;
  @Output() addWithdrawFundsCheckbook: EventEmitter<any> = new EventEmitter;

  selectedItem: any;
  showError: boolean;

  constructor(private simpleModalService: SimpleModalService,
              public modalHelperService: ModalHelperService,
              private helperService: HelperService,
              private authService: AuthService) { }

  ngOnInit() {}

  removeCharacters(event) {
    if (event.key === 'e' || 
        event.key === '-' || event.key === '+') {
      event.preventDefault();
    }   
  }

  setCustomValue() {
    if(this.customAmount) {
      this.selectedItem = {
        id: 5,
        value: this.customAmount,
        name: `$${this.customAmount}`
      }
    } else {
      this.selectedItem = {}
    }
  }

  showConfirmModal() {
    this.myLocation = this.helperService.locationData; 
    
   /*  if(this.selectedItem && this.selectedItem['value'] && this.myLocation || uncomment later
      (this.type === 'addFunds' && this.selectedItem && this.selectedItem['value'] && this.selectedItem['value'] >= 10))  */
      if(this.selectedItem && this.selectedItem['value'] && this.myLocation) {
      this.modalHelperService.modalOpened = true;
      let ttl = this.type === 'addFunds'?'Confirm Add Funds':'Confirm Withdrawal Funds'
      let msg = this.type === 'addFunds'?'Please confirm the deposit amount of $':'Please confirm the withdrawal amount of $'
      this.simpleModalService.addModal(ConfirmationModalComponent, {
          title: ttl,
          buttonText: 'Confirm',
          message: msg,
          amount: this.selectedItem['value']
      })
      .subscribe((isConfirmed) => {
        if(isConfirmed) {
          let option = {
            amount: this.selectedItem['value'],
            lat: this.myLocation.lat,
            lang: this.myLocation.long
          }
          this.addWithdrawFunds.emit(option);   
          this.helperService.spinner.show();     
        } else {
          this.modalHelperService.modalOpened = false;
        }
      },
      error => {
        console.log('Error', error.message);
      });
    } else {
      if(!this.myLocation) {
        let ttl = 'Warning';
        let msg = 'Your location is unknown. Please allow your location and try again.'
        this.modalHelperService.showConfirmationMessage(msg, ttl);
      } else {
        this.showError = true;
      }
    }    
  }

  fundByCheckbook(){

    /*
      Backend use oAuth2 for checkbook.io payment. so first time, frontend will check
      whether user granted checkbook.io permission or not.
    */

    if (!this.authService.getCheckbookToken()) {
        this.simpleModalService.addModal(ConfirmationModalComponent, {
          title: 'Confirm',
          buttonText: 'Agree',
          message: 'Please grant permission of checkbook.io to DraftMatch.',
          
        })
        .subscribe((isConfirmed) => {
        if(isConfirmed) {
          this.modalHelperService.modalOpened = false;
          var landingUrl = `${this.helperService.resolveAPI()}/checkbook/callback`;
          window.location.href = landingUrl;  
        } else {
          this.modalHelperService.modalOpened = false;
        }
      },
      error => {
        console.log('Error', error.message);
      });
    } else {
      
      this.myLocation = this.helperService.locationData;

      if(this.selectedItem && this.selectedItem['value'] && this.myLocation) {
      this.modalHelperService.modalOpened = true;
      let ttl = this.type === 'addFunds'?'Confirm Add Funds':'Confirm Withdrawal Funds'
      let msg = this.type === 'addFunds'?'Please confirm the deposit amount of $':'Please confirm the withdrawal amount of $'
      this.simpleModalService.addModal(ConfirmationModalComponent, {
            title: ttl,
            buttonText: 'Confirm',
            message: msg,
            amount: this.selectedItem['value']
        })
        .subscribe((isConfirmed) => {
          if(isConfirmed) {
            let option = {
              amount: this.selectedItem['value'],
              lat: this.myLocation.lat,
              lang: this.myLocation.long
            }
            this.addWithdrawFundsCheckbook.emit(option);
            this.helperService.spinner.show();     
          } else {
            this.modalHelperService.modalOpened = false;
          }
        },
        error => {
          console.log('Error', error.message);
        });
      } else {
        if(!this.myLocation) {
          let ttl = 'Warning';
          let msg = 'Your location is unknown. Please allow your location and try again.'
          this.modalHelperService.showConfirmationMessage(msg, ttl);
        } else {
          this.showError = true;
        }
      }  

    }

  }
}
