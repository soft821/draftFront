import {Component, OnInit} from '@angular/core';
import {ResponsiveService} from '../core/responsive/responsive.service';

@Component({
  selector: 'dm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public responsiveService: ResponsiveService) {}
  ngOnInit() {
   
  }

}
