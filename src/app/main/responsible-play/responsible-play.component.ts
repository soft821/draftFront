import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../core/helper.service';

@Component({
  selector: 'dm-privacy-policy',
  templateUrl: './responsible-play.component.html',
  styleUrls: ['./responsible-play.component.scss']
})
export class ResponsiblePlayComponent implements OnInit {

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.helperService.scrollToTopSamePage();
  }

}
