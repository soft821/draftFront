import {Component, OnInit} from '@angular/core';
import {MatchupsService} from './matchups.service';
import { HelperService } from '../../core/helper.service';

@Component({
  selector: 'dm-matchups',
  templateUrl: './matchups.component.html',
  styleUrls: ['./matchups.component.scss']
})
export class MatchupsComponent implements OnInit {
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
      img: 'https://pbs.twimg.com/profile_images/833767319973212161/Ft904pMk.jpg',
      name: 'PG R Westbrook',
      place: 'Hou @ Oku',
      time: '9 PM ET',
      salary: '15.500',
      matches: 101,
      points: 79.18,
      gtd: false,
      selected: false
    },
    {
      id: 1,
      img: 'https://vignette.wikia.nocookie.net/dragonball/images/6/6f/Son_Goku_GT.png/revision/latest?cb=20171116013458&path-prefix=es',
      name: 'PG R Westbrook',
      place: 'Oku @ Hou',
      time: '9 PM ET',
      salary: '14.400',
      matches: 90,
      points: 68,
      gtd: true,
      selected: false
    },
    {
      id: 2,
      img: 'https://i.pinimg.com/originals/a6/b1/3d/a6b13d370a770d55a9769baaf63030c0.png',
      name: 'PG R Westbrook',
      place: 'Abc @ Def',
      time: '9 PM ET',
      salary: '13.900',
      matches: 81,
      points: 58.88,
      gtd: false,
      selected: false
    }, 
    {
      id: 3,
      img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4329.png',
      name: 'PG R Westbrook',
      place: 'Oku @ Hou',
      time: '9 PM ET',
      salary: '13.500',
      matches: 81,
      points: 58.88,
      gtd: false,
      selected: false
    }, 
    {
      id: 4,
      img: 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4329.png',
      name: 'PG R Westbrook',
      place: 'Oku @ Hou',
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
      title: 'Game Time',
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
      title: 'Entry Type',
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
      img: '',
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

  constructor(private matchupsService: MatchupsService, private helperService: HelperService) { }

  ngOnInit() {
    
    this.getMatchups();
  //  this.getUsers();

  }
  getUsers() {
    this.matchupsService.getUsers()
     .subscribe(data => {
      console.log(data)
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
    this.contestData[1].data[0].value = event.id?event.value:0;   
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
    this.contestData[4].img = event.img;    
    this.contestData[4].data[0].data = event.name;    
    this.contestData[4].data[1].data = event.place;    
    this.contestData[4].data[1].data = event.time; 
    this.validateForm(event.selected, 4);   
  }

  next(event) {
    this.helperService.scrollToTopSamePage();
    if(this.validForm()) {  
      if(this.isEdit) {
        this.steps.map(x => x.current = false);
        this.steps[this.steps.length - 1].current = true;
      } else {        
        let index = this.steps.findIndex(x => x.current === true);
        if(index !== -1) {
          this.steps[index+1].current = true;
          this.steps[index+1].isChecked = true;
          this.steps[index].current = false;
          this.activeFormIndex = index+1;
        } 
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
    this.isEdit = true;
    this.activeFormIndex = row.id;
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
