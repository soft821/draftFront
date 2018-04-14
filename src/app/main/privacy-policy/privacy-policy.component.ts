import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../core/helper.service';

@Component({
  selector: 'dm-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.helperService.scrollToTopSamePage();
  }

}
