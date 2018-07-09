import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LobbyService} from '../lobby/lobby.service';
import {HelperService} from '../../core/helper.service';
import {ModalHelperService} from '../../core/modal-helper.service';
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
  modalOpened: boolean;
  paymentSubmitted: boolean;
  customAmount: number;

  constructor(private lobbyService: LobbyService,
              private helperService: HelperService,
              private addFundsService: AddFundsService,
              public modalHelperService: ModalHelperService) { }

  ngOnInit() {}

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

  addFundsCoinbase(event) { 
    this.paymentSubmitted = true;
     this.addFundsService.addFundsCoinbase(event)
    .subscribe(response => {
      let msg = response['message']?response['message']:'Payment request has been sent to your coinbase account';
      let ttl = 'Thank you'
      this.modalHelperService.showConfirmationMessage(msg, ttl);
      this.paymentSubmitted = false;
      this.helperService.spinner.hide();
    },
    error => {
      this.paymentSubmitted = false;
      this.helperService.spinner.hide();
      let ttl = 'Error'
      let desc = error.debug && error.debug[0] && error.debug[0] !== error.message?error.debug[0]:''
      this.modalHelperService.showConfirmationMessage(error.message, ttl, desc);
    })   
  }  
}
