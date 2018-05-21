import {Component, OnInit} from '@angular/core';
import {MatchupsService} from './matchups.service';
import {HelperService} from '../../core/helper.service';
import {SimpleModalService} from 'ngx-simple-modal';
import {ConfirmationModalComponent} from '../../shared/alert-modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'dm-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.scss']
})
export class MatchupsComponent implements OnInit {
  modalOpened: boolean;

  constructor(private simpleModalService: SimpleModalService) { }

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

  tableValues = [
    {
      id: 0,
      position: 'QB',
      slate: 'CLE 27 @ SD 30',
      score: 24.58,
      p: 'P',
      team: 'Rivers',
      match: 'Final',
      opponentPosition: 'QB',
      match1: '1st',
      opponent: 'garfield399',
      opponentScore: 22.58,
      entry: 2,
      winning: 5,
      editable: true,
      matchupType: 'Any Challenger',
      hasOpponent: true
    },
    {
      id: 1,
      position: 'QB',
      slate: 'CLE 27 @ SD 30',
      score: 24.58,
      p: 'P',
      team: 'Rivers',
      match: 'Final',
      opponentPosition: 'QB',
      match1: '1st',
      opponent: 'garfield399',
      opponentScore: 22.58,
      entry: 2,
      winning: 0,
      editable: false,
      matchupType: 'Tier Rank A',
      hasOpponent: false
    }
  ]

  user = {
    username: 'Username',
    record: 'Record: 1345 - 234 (W-L)',
    matchups: 0,
    totalEntries: 0,
    totalWinnings: 0
  }

  ngOnInit() {
    this.setValuesForUser();
  }

  setValuesForUser() {
    this.user.matchups = this.tableValues.length;
    this.tableValues.forEach(element => {
      this.user.totalEntries += element.entry;
      this.user.totalWinnings += element.winning;
    });
  }

  showConfirmModal(event) {
    this.modalOpened = true;
    let disposable = this.simpleModalService.addModal(ConfirmationModalComponent, {
        title: 'Confirm Matchup',
        message: 'Are you sure you want to cancel this matchup?'
    })
    .subscribe((isConfirmed)=>{
      this.modalOpened = false;
    });
  }
}