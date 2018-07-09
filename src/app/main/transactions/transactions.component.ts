import {Component, OnInit} from '@angular/core';
import {TransactionsService} from './transactions.service';
import {ModalHelperService} from '../../core/modal-helper.service';
import {HelperService} from '../../core/helper.service';
import {Observable} from 'rxjs';
import {LobbyService} from '../lobby/lobby.service';

@Component({
  selector: 'dm-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions: any;
  liveGames = [];
  live: any;
  pageLoaded: boolean;
  
  constructor(private transactionService: TransactionsService,
              public modalHelperService: ModalHelperService,
            private helperService: HelperService,
          private lobbyService: LobbyService) { }

  ngOnInit() {
    this.getTransactions();
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

  getTransactions() {
    this.helperService.spinner.show();
    this.transactionService.getTransactions()
    .subscribe(response => {
      this.transactions = response['response'];
      this.transactions.forEach(transaction => {
        if(transaction.type === 'send') {
          transaction.negative = true;
        } else {
          transaction.negative = false;
        }
      });
      this.helperService.spinner.hide();
    },
    error => {
      this.helperService.spinner.hide();
    })
  }
}
