import {Component, OnInit} from '@angular/core';
//import {EnterMatchupService} from './enter-matchup.service';
import {HelperService} from '../../core/helper.service';
import {SimpleModalService} from 'ngx-simple-modal';
import {ConfirmationModalComponent} from '../../shared/alert-modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'dm-enter-matchup',
  templateUrl: './enter-matchup.component.html',
  styleUrls: ['./enter-matchup.component.scss']
})
export class EnterMatchupComponent implements OnInit {
  modalOpened: boolean;

  constructor(private simpleModalService: SimpleModalService) { }


  ngOnInit() {
  }

  showConfirmModal(event) {
    this.modalOpened = true;
    this.simpleModalService.addModal(ConfirmationModalComponent, {
        title: 'Confirm Matchup',
        message: 'Are you sure you want to cancel this matchup?',
        buttonText: 'Yes',
        showTable: false
    })
    .subscribe((isConfirmed)=>{
      this.modalOpened = false;
    });
  }
}