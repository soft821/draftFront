import {Component, OnInit} from '@angular/core';
import {LobbyService} from './lobby.service';
import {HelperService} from '../../core/helper.service';

@Component({
  selector: 'dm-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  
  constructor(private lobbyService: LobbyService, 
              private helperService: HelperService) { }

  ngOnInit() {}

}
