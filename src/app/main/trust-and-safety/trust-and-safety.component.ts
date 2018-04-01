import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../core/helper.service';

@Component({
  selector: 'dm-privacy-policy',
  templateUrl: './trust-and-safety.component.html',
  styleUrls: ['./trust-and-safety.component.scss']
})
export class TrustAndSafetyComponent implements OnInit {

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.helperService.scrollToTop();
  }

}
