import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LobbyService} from '../lobby/lobby.service';
import {HelperService} from '../../core/helper.service';
import {ModalHelperService} from '../../core/modal-helper.service';
import {ContactSupportService} from './contact-support.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'dm-contact-support',
  templateUrl: './contact-support.component.html',
  styleUrls: ['./contact-support.component.scss']
})
export class ContactSupportComponent implements OnInit {
  liveGames = [];
  live: any;
  pageLoaded: boolean;
  description: string;

  constructor(private lobbyService: LobbyService,
              private helperService: HelperService,
              private authService: AuthService,
              public modalHelperService: ModalHelperService,
              private contactSupportService: ContactSupportService) { }

  ngOnInit() {
  }

  getData() {
    this.helperService.spinner.show();
    Observable.forkJoin([this.lobbyService.getMatchups('LOBBY')])
    .subscribe(data => {
      this.live = data[0];
      this.liveGames = this.live?this.live.response:[];     
      this.pageLoaded = true;
      this.helperService.spinner.hide();
    }, (error) => {
      this.pageLoaded = true;
      this.helperService.spinner.hide();
      console.log(error)
    });
  };

  submit() {
    let data = {
      email: this.authService.authenticatedUser.email,
      fullName: this.authService.authenticatedUser.name,
      text: this.description
    }
    this.contactSupportService.contactSupport(data)
    .subscribe(response => {
      console.log(response)
      this.modalHelperService.showConfirmationMessage(response['message']?response['message']:'Email successfully sent to support', 'Thank you');
      this.description = '';
    },
    error => {
      console.log(error)
      let ttl = 'Error'
      let desc = error.debug && error.debug[0] && error.debug[0] !== error.message?error.debug[0]:''
      this.modalHelperService.showConfirmationMessage(error.message, ttl, desc);
     // this.modalHelperService.showConfirmationMessage(error['message']?error['message']:'Error occurred while trying to send email to support', 'Error', error['debug']?error['debug'][0]:'');
    })
  }
}
