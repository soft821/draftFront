import {Component, OnInit} from '@angular/core';
import { ResponsiveService } from '../../../core/responsive/responsive.service';

@Component({
  selector: 'dm-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor(public responsiveService: ResponsiveService) { }
  imgUrl = 'https://static.shareasale.com/image/52555/5156_On_The_Move_com_Ads_300x100.jpg';

  ngOnInit() {
  }

}
