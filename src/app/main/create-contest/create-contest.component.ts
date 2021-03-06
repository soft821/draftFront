import {Component, OnInit} from '@angular/core';
import {CreateContestService} from './create-contest.service';
import {HelperService} from '../../core/helper.service';
import {LobbyService} from '../lobby/lobby.service';
import {Router} from '@angular/router';
import {STEPS, OPPONENT_PLAYER} from './const-variables';
import {SimpleModalService} from 'ngx-simple-modal';
import {ConfirmationModalComponent} from '../../shared/alert-modals/confirmation-modal/confirmation-modal.component';
import {AuthService} from '../../core/auth/auth.service';
import { ModalHelperService } from '../../core/modal-helper.service';

@Component({
  selector: 'dm-create-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.scss']
})
export class CreateContestComponent implements OnInit {
  activeFormIndex = 0;
  modalOpened: boolean;
  opponentPlayer: any;  
  steps: any[];
  gameTimes: any;
  players = [];
  playersObtained: boolean;
  gameFilterValues = [];
  opponentPlayers = [];
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
  opponentPlayerSelected: any;
  createContestInProgress: boolean;
  pageLoaded: boolean;

  constructor(private createContestService: CreateContestService, 
              private helperService: HelperService,
              private lobbyService: LobbyService,
              private route: Router,
              private auth: AuthService,
              public modalHelperService: ModalHelperService) { }

  ngOnInit() {
    this.steps = [].concat(STEPS);
    this.resetSteps(); // in case user left in the middle of create 
    this.opponentPlayer = OPPONENT_PLAYER;
    this.getSlates();
  }

  getSlates() {
    this.helperService.spinner.show();
    this.lobbyService.getSlates()
    .subscribe(data => {
      this.slates = data;
      this.gameTimes = this.slates?this.slates.response:[];
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
      this.helperService.spinner.hide();
    }, (error) => {
    });
  };

  getMatchups() {
    this.createContestService.getMatchups(this.filter)
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
  }

  getEntryFee(event) {
    this.entryFeeSelected = event;
    this.validateForm(event.selected, 1);
    this.validateUsersBalance(event, 1)
  }

  getMatchupType(event) {
    this.matchupSelected = event;  
    this.validateForm(event.selected, 2);
  }

  getPlayerPosition(event) {
    this.positionSelected = event;
    this.validateForm(event.selected, 3);  
  }

  getPlayer(event) {
    this.playerSelected = event;
    if(this.playerSelected) {
      this.opponentPlayers = this.players.filter(x => x.id !== this.playerSelected.id);
    }
    this.validateForm(event.selected, 4);   
  }

  getOpponentPlayer(event) {
    this.opponentPlayerSelected = event;
    this.validateForm(event.selected, 5);   
  }

  validateUsersBalance(event, id) {
    if(event.value > this.auth.authenticatedUser.balance && event.selected) {
      this.steps[id].showBalanceError = true;
    } else {
      this.steps[id].showBalanceError = false;
    }
  }

  next(event, target) {
    this.helperService.scrollToTarget(target);
    this.steps[this.activeFormIndex].stepSubmitted = true;
    
    if(this.isFormValid()) {               
      let index = this.steps.findIndex(x => x.current === true);
      if(index !== -1) {
        if(index === 4 && this.matchupSelected.match_type === 'set_opponent' && this.steps.length < 7) {
          this.steps.splice(5, 0, this.opponentPlayer);
        } else if(this.matchupSelected && this.matchupSelected.match_type !== 'set_opponent' && this.steps.length === 7) {
          this.steps.splice(5, 1);
        } 
        this.steps[index+1].current = true;
        this.steps[index+1].isChecked = true;
        this.steps[index].current = false;
        this.activeFormIndex = index+1;
      }    
    } 
  }

  back(event, target) {
    this.playersObtained = false;
    this.helperService.scrollToTarget(target);
    let index = this.steps.findIndex(x => x.current === true);
    if(index !== -1) {
      this.steps[index-1].current = true;
      this.steps[index-1].isChecked = true;
      this.steps[index-1].valid = false;
      this.steps[index-1].stepSubmitted = false;
      this.steps[index].current = false;
      this.activeFormIndex = index-1;
    }    
  }

  isFormValid() {
    if(this.steps[this.activeFormIndex].valid && !this.steps[this.activeFormIndex].showBalanceError) {
      return true;
    }
    return false;
  }

  selectRow(id, target) {
    this.playersObtained = false;
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
      this.opponentPlayerSelected = {};
    } else if(id === 1) {
      this.matchupSelected = {};
      this.positionSelected = {};
      this.playerSelected = {};
      this.opponentPlayerSelected = {};
    } else if(id === 2) {
      this.positionSelected = {};
      this.playerSelected = {};
      this.opponentPlayerSelected = {};
    } else if(id === 3) {
      this.playerSelected = {};
      this.opponentPlayerSelected = {};
    }
    else if(id === 4) {
      this.opponentPlayerSelected = {};
    }
  }

  getPlayers() {
    this.helperService.spinner.show();
    const params = {
      slateId: this.slateSelected?this.slateSelected.id:'Sun-Mon_2017_1_REG',
      position: this.positionSelected?this.positionSelected.title:'K'
    }
    this.createContestService.getFantasyPlayers(params)
    .subscribe(
      response => {
        this.temp = response;
        this.players = this.temp?this.temp.response:[];
        this.helperService.spinner.hide();
        this.playersObtained = true;
       this.setGameFilterValues();
      })    
  }

  setGameFilterValues() {
    this.createContestService.setGameFilterValues(this.players, this.gameFilterValues)
  }

  createMatchup(event) {
    this.createContestInProgress = true;
    let body = {
      slate_id: this.slateSelected.id,
      match_type: this.matchupSelected.match_type,
      entry_fee: this.entryFeeSelected.value,
      user_player_id: this.playerSelected.id,
      tier: this.playerSelected.tier,
      opp_player_id: this.opponentPlayerSelected?this.opponentPlayerSelected.id:''
    }   
    this.createContestService.createContest(body)
    .subscribe(response => {
      this.createContestInProgress = false;
      this.showConfirmationMessage('You have successfully created a contest', 'Thank you');
    }, 
    error => {
      this.showConfirmationMessage(error, 'Error', error.debug?error.debug[0]:'');
    })    
  }

  resetSteps() {
    this.steps.forEach(step => {
      if(step.id === 0) {
        step.isChecked = true;
        step.current = true;
        step.stepSubmitted = false;
        step.valid = true;
      } else {
        step.isChecked = false;
        step.current = false;
        step.stepSubmitted = false;
        step.valid = false;
      }        
    });
    this.activeFormIndex = 0;
  }

  showConfirmationMessage(message, title, description?) {
    this.modalHelperService.showConfirmationMessage(message, title, description);
    this.resetSteps();
    this.route.navigate(['/main/lobby']);
    this.helperService.scrollToTop(); 
    this.modalOpened = false;
  }
}
