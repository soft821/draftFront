import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dm-rules-and-scoring',
  templateUrl: './rules-and-scoring.component.html',
  styleUrls: ['./rules-and-scoring.component.scss']
})
export class RulesAndScoringComponent implements OnInit {

  itemsFirst = [
    {name: 'Rushing yards made = 0.1pts'},
    {name: 'Rushing touchdowns = 6pts'},
    {name: 'Passing yards = 0.04pts'},
    {name: 'Passing touchdowns = 4pts'},
    {name: 'Interceptions = -1pt'},
    {name: 'Receiving yards = 0.1pts'},
    {name: 'Receiving touchdowns = 6pts'},
    {name: 'Receptions = 0.5pts'},
    {name: 'Kickoff return touchdowns = 6pts'},
    {name: 'Punt return touchdowns = 6pts'},
    {name: 'Fumbles lost = -2pts'},
    {name: 'Own fumbles recovered touchdowns = 6pts'},
    {name: 'Two point conversions scored = 2pts'},
    {name: 'Two point conversion passes = 2pts'},
    {name: 'Field-goals from 0-39 yards = 3pts'},
    {name: 'Field-goals from 40-49 yards = 4pts'},
    {name: 'Field-goals from 50+ yards = 5pts'},
    {name: 'Extra-point conversions = 1pt'}
  ]

  itemsSecond = [    
    {name: 'Sacks = 1pt'},
    {name: 'Opponent-tumbles recovered = 2pts'},
    {name: 'Return touchdowns = 6pts'},
    {name: 'Extra Point Return = 2pts'},
    {name: 'Safeties = 2pts'},
    {name: 'Blocked Punt/Kick = 2pts'},
    {name: 'Interceptions made = 2pts'},
    {name: '0 points allowed = 10pts'},
    {name: '1-6 points allowed = 7pts'},
    {name: '7-13 points allowed = 4pts'},
    {name: '14-20 points allowed = 1pt'},
    {name: '21-27 points allowed = 0pts'},
    {name: '28-34 points allowed = -1pt'},
    {name: '35+ points allowed = -4pts'}  
  ]
  constructor() { }

  ngOnInit() {
  }

}
