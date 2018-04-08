import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DmSelectComponent} from './components/dm-select/dm-select.component';
import {ScrollbarModule} from 'ngx-scrollbar';
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
    ScrollbarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DmSelectComponent
  ],
  declarations: [
    DmSelectComponent
  ],
  entryComponents: [
  ],
  providers: [
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
