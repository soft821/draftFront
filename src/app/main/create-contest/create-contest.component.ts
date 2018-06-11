import {Component, OnInit} from '@angular/core';
import {CreateContestService} from './create-contest.service';
import {HelperService} from '../../core/helper.service';
import {LobbyService} from '../lobby/lobby.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dm-create-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.scss']
})
export class CreateContestComponent implements OnInit {
  activeFormIndex = 0;
  steps = [
    {
      id: 0,
      isChecked: true,
      title: 'Game Slate',
      current: true,
      stepSubmitted: false,
      valid: true,
      key: 'gameTime',
      errorMsg: ''
    },
    {
      id: 1,
      isChecked: false,
      title: 'Entry Fee',
      current: false,
      stepSubmitted: false,
      valid: false,
      key: 'entryFee',
      errorMsg: 'Please select an option'
    },
    {
      id: 2,
      isChecked: false,
      title: 'Matchup Type',
      current: false,
      stepSubmitted: false,
      valid: false,
      key: 'matchupType',
      errorMsg: 'Please select a matchup type'
    },
    {
      id: 3,
      isChecked: false,
      title: 'Player Position',
      current: false,
      stepSubmitted: false,
      valid: false,
      key: 'playerPosition',
      errorMsg: 'Please select a position'
    },
    {
      id: 4,
      isChecked: false,
      title: 'Select Player', 
      current: false,
      stepSubmitted: false,
      valid: false,
      key: 'selectPlayer',
      errorMsg: 'Please select a player'
    },
    {
      id: 5,
      isChecked: false,
      isLastOne: true,
      title: 'Create Contest', 
      current: false,
      stepSubmitted: false,
      valid: true,
      key: 'createContest',
      errorMsg: ''
    }
  ];

  matches = [
    {
      player1: 'Phi',
      player2: 'Was',
      date: 'SUN 1:00 PM' 
    },
    {
      player1: 'Car',
      player2: 'No',
      date: 'SUN 1:00 PM' 
    },
    {
      player1: 'Bal',
      player2: 'Ten',
      date: 'SUN 1:00 PM' 
    },
    {
      player1: 'Car',
      player2: 'No',
      date: 'SUN 1:00 PM' 
    },
    {
      player1: 'Jak',
      player2: 'Chi',
      date: 'SUN 1:00 PM' 
    },
    {
      player1: 'Jak',
      player2: 'Chi',
      date: 'SUN 1:00 PM' 
    },
    {
      player1: 'Jak',
      player2: 'Chi',
      date: 'SUN 1:00 PM' 
    },
    {
      player1: 'Jak',
      player2: 'Chi',
      date: 'SUN 1:00 PM' 
    }
  ];

  gameTimes: any;

  players = [];
  temp;

  filter = {
    status: 'LIVE'
  }

  machups: any;
  isEdit = false;
  slates: any;
  slateSelected: any;
  entryFeeSelected: any;
  positionSelected: any;
  matchupSelected: any;
  playerSelected: any;
  createContestInProgress: boolean;
  pageLoaded: boolean;
  constructor(private matchupsService: CreateContestService, 
              private helperService: HelperService,
              private lobbyService: LobbyService,
              private route: Router) { }

  ngOnInit() {
    this.getSlates();
   // this.getMatchups();
  //  this.getUsers();

  }

  getSlates() {
    this.lobbyService.getSlates()
    .subscribe(data => {
      this.slates = data;
      this.gameTimes = this.slates?this.slates.response:[];
      console.log(this.gameTimes, 'game slate step')
      let i = 0;
      this.gameTimes.forEach(element => {
        if(i===0) {
          element.selected = true;
        } else {
          element.selected = false;
        }
        i++;
      });
      this.slateSelected = this.gameTimes?this.gameTimes[0]:{};
      this.pageLoaded = true;
    }, (error) => {
    });
  };

  getUsers() {
    this.matchupsService.getUsers()
     .subscribe(data => {
    });
  }
  getMatchups() {
    this.matchupsService.getMatchups(this.filter)
     .subscribe(data => {
       this.machups = data;
    });
  }

  validateForm(value, id) {
    if(value) {
      this.steps[id].valid = true;
    } else {
      this.steps[id].valid = false;
    }
  }

  getGameTime(event) {
    this.gameTimes.filter(x => x.id !== event.id).map(x => x.selected = false);
    this.gameTimes.filter(x => x.id === event.id).map(x => x.selected = true);
    this.slateSelected = event;
    console.log(event)
  }

  getEntryFee(event) { console.log(event)
    this.entryFeeSelected = event;
    this.validateForm(event.selected, 1);
  }

  getMatchupType(event) {     console.log(event)
    this.matchupSelected = event;  
    this.validateForm(event.selected, 2);
  }

  getPlayerPosition(event) { console.log(event)
    this.positionSelected = event;
    this.validateForm(event.selected, 3);  
  }

  getPlayer(event) {   console.log(event)
    this.playerSelected = event;
    this.validateForm(event.selected, 4);   
  }

  next(eventm, target) {
    this.helperService.scrollToTarget(target);
    this.steps[this.activeFormIndex].stepSubmitted = true;
    if(this.isFormValid()) {               
      let index = this.steps.findIndex(x => x.current === true);
      if(index !== -1) {
        this.steps[index+1].current = true;
        this.steps[index+1].isChecked = true;
        this.steps[index].current = false;
        this.activeFormIndex = index+1;
      }    
    } 
  }

  isFormValid() {
    if(this.steps[this.activeFormIndex].valid) {
      return true;
    }
    return false;
  }

  selectRow(id, target) {
    this.helperService.scrollToTarget(target);
    this.activeFormIndex = id;
    this.steps.forEach(element => {
      if(element.id > id) {
        element.isChecked = false;
        element.stepSubmitted = false;
      }
    });
    this.goToScreen(id);
  }

  goToScreen(id) {
    this.steps.filter(x => x.id === id).map(x => x.current = true);
    this.steps.filter(x => x.id !== id).map(x => x.current = false);
    this.resetData(id);
  }

  resetData(id) {
    this.steps.filter(x => x.id > id).map(x => x.valid = false, x => x.stepSubmitted = false);
    if(id < 4) {
      this.players.filter(x => x.selected = false);
    }
    if(id === 0) {
      this.entryFeeSelected = {};
      this.matchupSelected = {};
      this.positionSelected = {};
      this.playerSelected = {};
    } else if(id === 1) {
      this.matchupSelected = {};
      this.positionSelected = {};
      this.playerSelected = {};
    } else if(id === 2) {
      this.positionSelected = {};
      this.playerSelected = {};
    } else if(id === 3) {
      this.playerSelected = {};
    }
  }

  getPlayers() {
    const params = {
      slateId: this.slateSelected?this.slateSelected.id:'Sun-Mon_2017_1_REG',
      position: this.positionSelected?this.positionSelected.title:'K'
    }
    this.matchupsService.getFantasyPlayers(params)
    .subscribe(response => {
      console.log(response)
      this.temp = response;
      this.players = this.temp?this.temp.response:[];
    })
    
  }

  createMatchup(event) {
    this.createContestInProgress = true;
    let body = {
      slate_id: this.slateSelected.id,
      match_type: this.matchupSelected.match_type,
      entry_fee: this.entryFeeSelected.value,
      user_player_id: this.playerSelected.id,
      tier: this.playerSelected.tier,
      opp_player_id: ''
    }   
    this.matchupsService.createContest(body)
    .subscribe(response => {
      console.log(response)
      this.createContestInProgress = false;
      this.route.navigate(['/lobby'])
    })
  }
}
