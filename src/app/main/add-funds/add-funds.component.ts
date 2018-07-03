import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LobbyService} from '../lobby/lobby.service';
import {HelperService} from '../../core/helper.service';
import {ModalHelperService} from '../../core/modal-helper.service';
import {TransformationType, Direction} from 'angular-coordinates';
import {SimpleModalService} from 'ngx-simple-modal';
import {ConfirmationModalComponent} from '../../shared/alert-modals/confirmation-modal/confirmation-modal.component';
import {AddFundsService} from './add-funds.service';

@Component({
  selector: 'dm-add-funds',
  templateUrl: './add-funds.component.html',
  styleUrls: ['./add-funds.component.scss']
})
export class AddFundsComponent implements OnInit {
  liveGames = [];
  live: any;
  pageLoaded: boolean;
  items = [
    {id: 0, value: 10, name: '$10'},
    {id: 1, value: 25, name: '$25'},
    {id: 2, value: 50, name: '$50'},
    {id: 3, value: 75, name: '$75'},
    {id: 4, value: 100, name: '$100'}
  ]
  selectedItem: any;
  direction = Direction;
  type = TransformationType;
  myLocation: any;
  showError: boolean;
  modalOpened: boolean;
  customAmount: number;
  paymentSubmitted: boolean;

  constructor(private lobbyService: LobbyService,
              private helperService: HelperService,
              public modalHelperService: ModalHelperService,
              private simpleModalService: SimpleModalService,
              private addFundsService: AddFundsService) { }

  ngOnInit() {
    this.subscribeCurrentPosition();
  }

  subscribeCurrentPosition() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.watchPosition(
        (position) => {
          this.myLocation = {
            lat: position.coords.latitude,
            long: position.coords.longitude
          }
        }, (error) => {
          console.log('Geolocation error: '+ error.message);
        });
      } else {
        console.log('Geolocation not supported in this browser');
      }
  }

  getData() {
    this.helperService.spinner.show();
    Observable.forkJoin([this.lobbyService.getMatchups('LOBBY')])
    .subscribe(data => {
      this.live = data[0];
      this.liveGames = this.live?this.live.response:[];
     
      this.pageLoaded = true;
      this.helperService.spinner.hide();
    }, (error) => {
      this.pageLoaded = true;
      this.helperService.spinner.hide();
      console.log(error)
    });
  };

  addFundsCoinbase() {    
    this.paymentSubmitted = true;
    let body = {
      amount: this.selectedItem['value'],
      lat: this.myLocation.lat,
      lang: this.myLocation.long
    }
    this.addFundsService.addFundsCoinbase(body)
    .subscribe(response => {
      let msg = response.message?response.message:'Payment request has been sent to your coinbase account';
      let ttl = 'Thank you'
      this.modalHelperService.showConfirmationMessage(msg, ttl);
      this.paymentSubmitted = false;
    },
    error => {
      this.paymentSubmitted = false;
      let ttl = 'Error'
      this.modalHelperService.showConfirmationMessage(error.message, ttl);
    })  
  }

  showConfirmModal() {
    if(this.selectedItem && this.selectedItem['value'] && this.myLocation) {
      this.modalOpened = true;
      this.simpleModalService.addModal(ConfirmationModalComponent, {
          title: 'Confirm Add Funds',
          buttonText: 'Confirm',
          message: `You are about to deposit amount of ${this.selectedItem['name']}`
      })
      .subscribe((isConfirmed) => {
        if(isConfirmed) {
          this.addFundsCoinbase();        
        }
        this.modalOpened = false;
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
  };

  removeCharacters(event) {
    if (event.key === 'e' || event.key === '.' || 
        event.key === '-' || event.key === '+') {
      event.preventDefault();
    }   
  };

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
}
