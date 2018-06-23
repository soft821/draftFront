import {Component, OnInit} from '@angular/core';
import {MatchupsService} from './matchups.service';
import {HelperService} from '../../core/helper.service';
import {SimpleModalService} from 'ngx-simple-modal';
import {ConfirmationModalComponent} from '../../shared/alert-modals/confirmation-modal/confirmation-modal.component';
import {LobbyService} from '../lobby/lobby.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'dm-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.scss']
})
export class MatchupsComponent implements OnInit {
  modalOpened: boolean;

  constructor(private simpleModalService: SimpleModalService,
              private lobbyService: LobbyService,
              private authService: AuthService,
              private helperService: HelperService,
              private matchupService: MatchupsService) { }

  titles = [
    {
      id: 0,
      title: 'Your Player'
    },
    {
      id: 1,
      title: 'Opponent'
    },
    {
      id: 2,
      title: 'Matchup Type'
    },
    {
      id: 3,
      title: 'Entry'
    },
    {
      id: 4,
      title: 'Edit'
    }
  ]

  tableValues = [];

  user = {
    username: this.authService.authenticatedUser.username,
    record: 'Record: ' + this.authService.authenticatedUser.wins + ' - ' + this.authService.authenticatedUser.loses + ' (W-L)',
    matchups: 0,
    totalEntries: 0,
    totalWinnings: 0
  }
  tempList: any;

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.helperService.spinner.show();
    this.lobbyService.getMatchups('MATCHUPS')
    .subscribe( response => {
      this.tempList = response;
      this.tableValues = [];
      if(this.tempList.response)
      this.tempList.response.forEach(element => {
        if(element.contests && element.contests.length) {
          element.contests.forEach(contest => {
            contest.name = element.name; // name of the slate 
            // players name replace with first letter
            if(contest && contest.entries) {
              contest.entries.forEach(entry => {
                entry.fantasy_player.name = this.helperService.getPlayer(entry.fantasy_player.name);
              });
            }
            this.tableValues.push(contest);
          });
        }            
      }); 
      this.setValuesForUser(this.tempList.userInfo);
      this.helperService.spinner.hide();
    })
  }

  setValuesForUser(userInfo) {
    this.user.matchups = userInfo.entries;
    this.user.totalEntries = userInfo.totalEntry;
    this.tableValues.forEach(element => {
      this.user.totalWinnings += element.winning;
    });
  }

  cancelContest(event) {
    this.modalOpened = true;
    this.simpleModalService.addModal(ConfirmationModalComponent, {
        title: 'Confirm Matchup',
        message: 'Are you sure you want to cancel this matchup?',
        buttonText: 'Yes'
    })
    .subscribe((isConfirmed)=>{
      if(isConfirmed) {
        this.matchupService.cancelContest(event.id)
        .subscribe(response => {
          let index = this.tableValues.findIndex(x => x.id === event.id);
          if(index !== -1) {
            this.tableValues.splice(index, 1);
          }
          let msg = 'You have successfully canceled contest';
          let ttl = 'Thank you'
          this.showConfirmationMessage(msg, ttl);
        }, 
        error => {        
          this.showConfirmationMessage(error.message, 'Error');
        });
      }       
        this.modalOpened = false;      
    });
  }

  showConfirmationMessage(message, title) {
    this.modalOpened = true;
    this.simpleModalService.addModal(ConfirmationModalComponent, {
        title: title,
        message: message,
        buttonText: 'OK'
    })
    .subscribe((isConfirmed)=> {      
      this.modalOpened = false;
    });
  }
}
