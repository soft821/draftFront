import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

declare function require(moduleName: string): any;
// const { version: appVersion } = require('../../../../package.json')

@Component({
  selector: 'dm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

 appVersion;

  constructor() {
   // this.appVersion = appVersion;
   }

  ngOnInit() {
  }

}
