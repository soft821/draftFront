import {Component, OnInit} from '@angular/core';
import {MatchupsService} from './matchups.service';
import {HelperService} from '../../core/helper.service';
import {SimpleModalService} from 'ngx-simple-modal';
import {ConfirmationModalComponent} from '../../shared/alert-modals/confirmation-modal/confirmation-modal.component';
import {LobbyService} from '../lobby/lobby.service';
import {AuthService} from '../../core/auth/auth.service';
import {ModalHelperService} from '../../core/modal-helper.service';
import { ENTRY_FEE } from '../create-contest/entry-fee/entryFeeValues';

@Component({
  selector: 'dm-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.scss']
})
export class MatchupsComponent implements OnInit {
  modalOpened: boolean;
  entryFee = [];

  constructor(private simpleModalService: SimpleModalService,
              private lobbyService: LobbyService,
              private authService: AuthService,
              private helperService: HelperService,
              private matchupService: MatchupsService,
              public modalHelperService: ModalHelperService) { }

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
    totalEntries: 0
  }
  tempList: any;

  ngOnInit() {
    this.entryFee = ENTRY_FEE;
    this.getData();
  }

  getData() {
    this.helperService.spinner.show();
    this.lobbyService.getMatchups('MATCHUPS')
    .subscribe( response => {
      this.tempList = response;
      this.tableValues = [];
      if(this.tempList.response) {
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
              this.entryFee.forEach(fee => {
                if(contest.entryFee === fee.value) {
                  contest.prize = fee.prize;
                }
              });
              this.tableValues.push(contest);
            });
          }            
        }); 
      }
      this.setValuesForUser(this.tempList.userInfo);
      this.helperService.spinner.hide();
    })
  }

  setValuesForUser(userInfo) {
    this.user.matchups = userInfo.entries;
    this.user.totalEntries = userInfo.totalEntry;
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
          this.modalHelperService.showConfirmationMessage(msg, ttl);
        }, 
        error => {        
          this.modalHelperService.showConfirmationMessage(error.message, 'Error', error.debug?error.debug[0]:'');
        });
      }       
        this.modalOpened = false;      
    });
  }

  showConfirmModal(event) {
    this.modalOpened = true;
    this.simpleModalService.addModal(ConfirmationModalComponent, {
        title: 'Confirm Matchup',
        buttonText: 'Enter',
        confirmMatchup: true,
        confirmMatchupTable: event
    })
    .subscribe((isConfirmed) => {
      if(isConfirmed) {
        let temp = {
          entry_id: isConfirmed.entries[0].id,
          player_id: isConfirmed.entries?isConfirmed.entries[0].fantasy_player.id:-1
        }
        this.matchupService.editEntry(temp)
        .subscribe(response => {
         /*  let index = this.enterMatchupList.findIndex(x => x.id === event.id);
          if(index !== -1) {
            this.enterMatchupList.splice(index, 1);
          } */
          console.log(response)
          let msg = 'You have successfully updated the contest';
          let ttl = 'Thank you'
          this.modalHelperService.showConfirmationMessage(msg, ttl);
        //  this.getData(); 
        }, 
        error => {      
          this.modalHelperService.showConfirmationMessage(error.message, 'Error', error.debug?error.debug[0]:'');
        //  this.getData();
        });
      }
      this.modalOpened = false;
      this.helperService.scrollToTopSamePage();
    });
  };

  editContest(event) {
    this.modalOpened = true;
    event.entries[1].entryFee = event.entryFee;
    event.entries[1].prize = event.prize;
    this.simpleModalService.addModal(ConfirmationModalComponent, {
      title: 'Edit Matchup',
      buttonText: 'Select',
      showTable: true,
      tableValues: event.entries[1] // opponent is on index 1
    })
    .subscribe((isConfirmed)=> {
      if(isConfirmed) {
        // event is contest, has id 
        if(event && event.entries) {
          event.entries[0].fantasy_player = isConfirmed;
          event.entries[0].game = isConfirmed.game;
        }
        this.showConfirmModal(event);
      } else {
        this.modalOpened = false;
      }      
    }); 
  }


}
