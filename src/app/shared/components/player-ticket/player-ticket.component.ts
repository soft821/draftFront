import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'dm-player-ticket',
  templateUrl: './player-ticket.component.html',
  styleUrls: ['./player-ticket.component.scss']
})
export class PlayerTicketComponent implements OnInit {

  @Input() player;
  @Input() game;
  @Input() username;

  constructor() { }

  ngOnInit() {
    console.log(this.player, 'pla')
  }

}
