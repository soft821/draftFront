import {Component, OnInit} from '@angular/core';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import { faPinterest } from '@fortawesome/free-brands-svg-icons/faPinterest';

@Component({
  selector: 'dm-refer-friends',
  templateUrl: './refer-friends.component.html',
  styleUrls: ['./refer-friends.component.scss']
})
export class ReferFriendsComponent implements OnInit {

  description = 'DraftMatch - The Fastest Way to Play Daily Fantasy Sports! Download the app for iOS or Android at https://draftmatch.com and compete to win.';
  showOther = false;

  constructor() { }

  ngOnInit() {
  }

  showOtherButtons() {
    this.showOther = true;
  }

}
