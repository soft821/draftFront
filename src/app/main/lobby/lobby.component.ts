import {Component, OnInit} from '@angular/core';
import {LobbyService} from './lobby.service';
import {HelperService} from '../../core/helper.service';
import { ConfirmationModalComponent } from '../../shared/alert-modals/confirmation-modal/confirmation-modal.component';
import { SimpleModalService } from 'ngx-simple-modal';

@Component({
  selector: 'dm-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  modalOpened: boolean
  constructor(private lobbyService: LobbyService, 
              private helperService: HelperService,
              private simpleModalService: SimpleModalService) { }

  ngOnInit() {}

  

  showConfirmModal(event) {
    this.modalOpened = true;
    let disposable = this.simpleModalService.addModal(ConfirmationModalComponent, {
        title: 'Confirm Matchup',
        buttonText: 'Enter',
        setOpponent: true
    })
    .subscribe((isConfirmed)=>{
      this.modalOpened = false;
    });
  }

}
