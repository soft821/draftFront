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
              private helperService: HelperService) { }

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
  temp: any;

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.helperService.spinner.show();
    this.lobbyService.getMatchups('MATCHUPS')
    .subscribe( response => {
      this.temp = response;
      if(this.temp.response) {
        this.tableValues = [];
        this.temp.response.forEach(element => {
          if(element.contests && element.contests.length) {
            element.contests.forEach(contest => {
              contest.name = element.name; // name of the slate 
              // players name replace with first letter
              if(contest && contest.entries) {
                contest.entries.forEach(entry => {                  
                  let lastName = entry.fantasy_player.name.substr(entry.fantasy_player.name.indexOf(' ')+1);
                  let firstName = entry.fantasy_player.name.substr(0,1) + '. ';
                  entry.fantasy_player.name = firstName + lastName;
                });
              }
              this.tableValues.push(contest);
            });
          }            
        });        
        this.setValuesForUser();
      }
      this.helperService.spinner.hide();
    })
  }

  setValuesForUser() {
    this.user.matchups = this.tableValues.length;
    this.tableValues.forEach(element => {
      this.user.totalEntries += element.entryFee;
      this.user.totalWinnings += element.winning;
    });
  }

  showConfirmModal(event) {
    this.modalOpened = true;
    this.simpleModalService.addModal(ConfirmationModalComponent, {
        title: 'Confirm Matchup',
        message: 'Are you sure you want to cancel this matchup?',
        buttonText: 'Yes',
        setOpponent: false
    })
    .subscribe((isConfirmed)=>{
      this.modalOpened = false;
    });
  }
}