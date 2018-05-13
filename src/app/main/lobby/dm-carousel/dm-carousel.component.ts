import {Component, OnInit, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef} from '@angular/core';
import {DragScrollDirective} from 'ngx-drag-scroll';

@Component({
  selector: 'dm-carousel',
  templateUrl: './dm-carousel.component.html',
  styleUrls: ['./dm-carousel.component.scss']
})
export class DmCarouselComponent implements OnInit {
  @ViewChild('nav', {read: DragScrollDirective}) ds: DragScrollDirective;

  leftNavDisabled = false;
  rightNavDisabled = false;
  dragScroll: DragScrollDirective;

  items = [
    {
      time: '1:30 - 3rd',
      team1: 'GS',
      team2: 'CLE',
      points1: 49,
      points2: 69,
      img: 'https://i.axs.com/2015/06/promoted-media-optimized_55831e68c9d99.png'
    },
    {
      time: '3:13 - 1st',
      team1: 'LAC',
      team2: 'MIL',
      points1: 12,
      points2: 14,
      img: 'https://i.axs.com/2015/06/promoted-media-optimized_55831e68c9d99.png'
    },
    {
      time: 'Final',
      team1: 'ATL',
      team2: 'CHI',
      points1: 75,
      points2: 55,
      img: 'https://i.axs.com/2015/06/promoted-media-optimized_55831e68c9d99.png'
    },
    {
      time: 'Final',
      team1: 'MIA',
      team2: 'WSH',
      points1: 91,
      points2: 87,
      img: 'https://i.axs.com/2015/06/promoted-media-optimized_55831e68c9d99.png'
    },
    {
      time: 'Final',
      team1: 'BKN',
      team2: 'NO',
      points1: 75,
      points2: 55,
      img: 'https://i.axs.com/2015/06/promoted-media-optimized_55831e68c9d99.png'
    },
    {
      time: 'Final',
      team1: 'HOU',
      team2: 'PHX',
      points1: 75,
      points2: 55,
      img: 'https://i.axs.com/2015/06/promoted-media-optimized_55831e68c9d99.png'
    },
    {
      time: '1:30 - 3rd',
      team1: 'GS',
      team2: 'CLE',
      points1: 49,
      points2: 69,
      img: 'https://i.axs.com/2015/06/promoted-media-optimized_55831e68c9d99.png'
    },
    {
      time: '3:13 - 1st',
      team1: 'LAC',
      team2: 'MIL',
      points1: 12,
      points2: 14,
      img: 'https://i.axs.com/2015/06/promoted-media-optimized_55831e68c9d99.png'
    },
    {
      time: 'semi-Final',
      team1: 'LLL',
      team2: 'CCC',
      points1: 75,
      points2: 55,
      img: 'https://i.axs.com/2015/06/promoted-media-optimized_55831e68c9d99.png'
    }
  ]
  constructor(private cdref: ChangeDetectorRef) { }

  ngOnInit() {}

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }
  
  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
    this.cdref.detectChanges();
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
    this.cdref.detectChanges();
  }
  
}
