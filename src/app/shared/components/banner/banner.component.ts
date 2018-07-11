import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'dm-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor() { }
  imgUrl = 'https://static.shareasale.com/image/52555/5156_On_The_Move_com_Ads_728x90.jpg';

  ngOnInit() {
  }

}
