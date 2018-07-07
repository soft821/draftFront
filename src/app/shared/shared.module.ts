import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ImageUploadModule} from 'ng2-imageupload';
import {FileUploadModule} from 'ng2-file-upload';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DmSelectComponent} from './components/dm-select/dm-select.component';
import {BannerComponent} from './components/banner/banner.component';
import {ContestIconComponent} from './components/contest-icon/contest-icon.component';
import {ScrollbarModule} from 'ngx-scrollbar';
import {ConfirmationModalComponent} from './alert-modals/confirmation-modal/confirmation-modal.component';
import {PlayerTicketComponent} from './components/player-ticket/player-ticket.component';
import {NavComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {MenuComponent} from './components/menu/menu.component';
import {SelectImageComponent} from './select-image/select-image.component';
import {ColorPickerComponent} from './components/color-picker/color-picker.component';
import {ColorPickerService} from './components/color-picker/color-picker.service';
import {DmIconSelectComponent} from './components/dm-icon-select/dm-icon-select.component';
import {CheckboxFilterComponent} from './components/checkbox-filter/checkbox-filter.component';
import {SignupFormComponent} from './components/signup-form/signup-form.component';
import {UnregisteredNavComponent} from './unregistered-nav/unregistered-nav.component';
import {AdsenseModule} from 'ng2-adsense';
/*
 * SharedModule
 * SharedModule is used to hold common components, directives, and pipes and share them with modules that need them.
 * https://angular.io/docs/ts/latest/guide/ngmodule.html#shared-module
 * Example: 'Only numbers' (allows only integer input) directive will be used in multiple modules and components across the application.
 * */

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollbarModule,
    RouterModule,
    ImageUploadModule,
    FileUploadModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-2173766795435813',
      adSlot: 8280455095,
    }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule,
    DmSelectComponent,
    DmIconSelectComponent,
    BannerComponent,
    ContestIconComponent,
    ConfirmationModalComponent,
    NavComponent,
    MenuComponent,
    SelectImageComponent,
    FileUploadModule,
    ColorPickerComponent,
    CheckboxFilterComponent,
    SignupFormComponent,
    UnregisteredNavComponent
  ],
  declarations: [
    DmSelectComponent,
    BannerComponent,
    ContestIconComponent,
    ConfirmationModalComponent,
    PlayerTicketComponent,
    NavComponent,
    MenuComponent,
    SelectImageComponent,
    ColorPickerComponent,
    DmIconSelectComponent,
    CheckboxFilterComponent,
    SignupFormComponent,
    UnregisteredNavComponent
  ],
  entryComponents: [
    ConfirmationModalComponent
  ],
  providers: [
    ColorPickerService
  ]
})
export class SharedModule {
  static forRoot() {
    return {
        ngModule: SharedModule,
        providers: [],
    };
 }
}
