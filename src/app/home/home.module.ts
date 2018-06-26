import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupportFormComponent} from './landing-page/support-form/support-form.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SharedModule} from '../shared/shared.module';
import {HomeRoutingModule} from './home.routing';
import {HomeComponent} from './home.component';
import { ResetFormComponent } from './landing-page/reset-form/reset-form.component';

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule
  ],
  declarations: [
    SupportFormComponent,
    LandingPageComponent,
    HomeComponent,
    ResetFormComponent
  ]
})
export class HomeModule { }
