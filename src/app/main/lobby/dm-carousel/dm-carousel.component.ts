import {Component, OnInit, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef} from '@angular/core';
import {DragScrollDirective} from 'ngx-drag-scroll';

@Component({
  selector: 'dm-carousel',
  templateUrl: './dm-carousel.component.html',
  styleUrls: ['./dm-carousel.component.scss']
})
export class DmCarouselComponent implements OnInit {
  @ViewChild('nav', {read: DragScrollDirective}) ds: DragScrollDirective;
  @Input() list;
  @Input() headline;

  leftNavDisabled = false;
  rightNavDisabled = false;
  dragScroll: DragScrollDirective;

  constructor(private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this.list)
  }

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
