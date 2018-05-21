import {Component, OnInit} from '@angular/core';
import {CreateContestService} from './create-contest.service';
import {HelperService} from '../../core/helper.service';

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
      key: 'gameTime'
    },
    {
      id: 1,
      isChecked: false,
      title: 'Entry Fee',
      current: false,
      key: 'entryFee'
    },
    {
      id: 2,
      isChecked: false,
      title: 'Matchup Type',
      current: false,
      key: 'matchupType'
    },
    {
      id: 3,
      isChecked: false,
      title: 'Player Position',
      current: false,
      key: 'playerPosition'
    },
    {
      id: 4,
      isChecked: false,
      title: 'Select Player', 
      current: false,
      key: 'selectPlayer'
    },
    {
      id: 5,
      isChecked: false,
      isLastOne: true,
      title: 'Create Contest', 
      current: false,
      key: 'createContest'
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

  gameTimes = [
    {
      id: 0,
      date: '9/11 1:00 pm',
      day: 'SUN-MON',
      selected: true
    },
    {
      id: 1,
      date: '9/10 2:00 pm',
      day: 'MON-TUE',
      selected: false
    },
    {
      id: 2,
      date: '9/11 1:00 pm',
      day: 'SUN-MON',
      selected: false
    },
    {
      id: 3,
      date: '9/11 1:00 pm',
      day: 'SUN-MON',
      selected: false
    },
    {
      id: 4,
      date: '9/11 1:00 pm',
      day: 'SUN-MON',
      selected: false
    },
    {
      id: 5,
      date: '9/11 1:00 pm',
      day: 'SUN-MON',
      selected: false
    },
    {
      id: 6,
      date: '9/11 1:00 pm',
      day: 'SUN-MON',
      selected: false
    }
  ]

  players = [
    {
      id: 0,
      rank: 'A',
      position: 'QB',
      name: 'Tom Brady',
      game: 'Hou @ Oku',
      time: '9 PM ET',
      salary: '15.500',
      matches: 101,
      points: 79.18,
      gtd: false,
      selected: false
    },
    {
      id: 1,
      rank: 'A',
      position: 'QB',
      name: 'Tom Brady',
      game: 'Oku @ Hou',
      time: '9 PM ET',
      salary: '14.400',
      matches: 90,
      points: 68,
      gtd: true,
      selected: false
    },
    {
      id: 2,
      rank: 'A',
      position: 'QB',
      name: 'Tom Brady',
      game: 'Abc @ Def',
      time: '9 PM ET',
      salary: '13.900',
      matches: 81,
      points: 58.88,
      gtd: false,
      selected: false
    }, 
    {
      id: 3,
      rank: 'A',
      position: 'QB',
      name: 'Tom Brady',
      game: 'Oku @ Hou',
      time: '9 PM ET',
      salary: '13.500',
      matches: 81,
      points: 58.88,
      gtd: false,
      selected: false
    }, 
    {
      id: 4,
      rank: 'A',
      position: 'QB',
      name: 'Tom Brady',
      game: 'Oku @ Hou',
      time: '9 PM ET',
      salary: '13.500',
      matches: 81,
      points: 58.88,
      gtd: true,
      selected: false
    }
  ]

  contestData = [
    {
      id: 0,
      title: 'Game Slate',
      img: '',
      clock: true,
      valid: true,
      data: [
        { 
          id: -1,
          data: this.gameTimes[0].date,
          value: -1,
          type: '',
          color: '#000000',
          bold: true
        },
        { 
          id: -1,
          data: this.gameTimes[0].day,
          value: 0,
          type: '',
          color: '#7b7b7b',
          fontSize: 13
        }
      ]
    },
    {
      id: 1,
      title: 'Entry Fee',
      img: '',
      clock: false,
      valid: false,
      data: [
        {
          id: -1,
          data: '',
          value: 0,
          type: '',
          color: '#ee3030',
          bold: true
        }
      ]
    },
    {
      id: 2,
      title: 'Matchup Type',
      img: '',
      clock: false,
      valid: false,
      data: [
        { 
          id: -1,
          data: '',
          value: 0,
          type: '',
          color: '#ee3030',
          bold: true
        }
      ]
    },
    {
      id: 3,
      title: 'Player Position',
      img: '',
      clock: false,
      valid: false,
      data: [
        { 
          id: -1,
          data: '',
          value: 0,
          type: '',
          color: '#ee3030',
          bold: true
        }
      ]
    },
    {
      id: 4,
      title: 'Select Player',
      img: true,
      clock: false,
      valid: false,
      data: [       
        { 
          id: -1,
          data: '',
          value: 0,
          type: '',
          color: '#000000',
          bold: true
        },
        { 
          id: -1,
          data: '',
          value: 0,
          type: '',
          color: '#000000',
          fontSize: 15
        },
        { 
          id: -1,
          data: '',
          value: 0,
          type: '',
          color: '#727272',
          fontSize: 13
        }
      ]
    }
  ]

  filter = {
    status: 'LIVE'
  }

  machups: any;
  isEdit = false;

  constructor(private matchupsService: CreateContestService, 
              private helperService: HelperService) { }

  ngOnInit() {
    
    this.getMatchups();
  //  this.getUsers();

  }
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
      this.contestData[id].valid = true;
    } else {
      this.contestData[id].valid = false;
    }
  }

  getGameTime(event) {
    this.gameTimes.filter(x => x.id !== event.id).map(x => x.selected = false);
    this.gameTimes.filter(x => x.id === event.id).map(x => x.selected = true);
    this.contestData[0].data[0].data = event.date;
    this.contestData[0].data[1].data = event.day;
  }

  getEntryFee(event) {
    this.contestData[1].data[0].data = event.value;  
    this.contestData[1].data[0].value = event.prize?event.prize:0;   
    this.contestData[1].data[0].id = event.id;
    this.validateForm(event.selected, 1);
  }

  getMatchupType(event) {
    this.contestData[2].data[0].data = event.title;    
    this.contestData[2].data[0].type = event.match_type;    
    this.validateForm(event.selected, 2);
  }

  getPlayerPosition(event) {
    this.contestData[3].data[0].data = event.title;  
    this.validateForm(event.selected, 3);  
  }

  getPlayer(event) {  
    this.contestData[4].data[0].data = event.name;    
    this.contestData[4].data[1].data = event.place;    
    this.contestData[4].data[1].data = event.time; 
    this.validateForm(event.selected, 4);   
  }

  next(event) {
    this.helperService.scrollToTopSamePage();
    if(this.validForm()) {                
      let index = this.steps.findIndex(x => x.current === true);
      if(index !== -1) {
        this.steps[index+1].current = true;
        this.steps[index+1].isChecked = true;
        this.steps[index].current = false;
        this.activeFormIndex = index+1;
      }    
    }
  }

  validForm() {
    if(this.contestData[this.activeFormIndex].valid) {
      return true;
    }
    return false;
  }

  selectRow(row) {
    this.activeFormIndex = row.id;
    this.steps.forEach(element => {
      if(element.id > row.id) {
        element.isChecked = false;
      }
    });
    this.goToScreen(row.id);
  }

  goToScreen(id) {
    this.steps.filter(x => x.id === id).map(x => x.current = true);
    this.steps.filter(x => x.id !== id).map(x => x.current = false);
  }

  createMatchup(event) {
    console.log(this.contestData)
   // this.prepareObjectForCreate();

  }
}
