import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LobbyService} from '../lobby/lobby.service';
import {HelperService} from '../../core/helper.service';
import {ModalHelperService} from '../../core/modal-helper.service';
import {WithdrawService} from './withdraw.service';

@Component({
  selector: 'dm-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  liveGames = [];
  live: any;
  pageLoaded: boolean;
  showError: boolean;
  customAmount: number;
  paymentSubmitted: boolean;
  selectedItem: any;

  constructor(private lobbyService: LobbyService,
              private helperService: HelperService,
              public modalHelperService: ModalHelperService,
              private withdrawService: WithdrawService) { }
  
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
  
  withdrawFundsCoinbase(event) {    
    this.paymentSubmitted = true;
    this.withdrawService.withdrawFundsCoinbase(event)
    .subscribe(response => {
      let msg = response.message?response.message:'You successfully withdraw money to your coinbase account';
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
