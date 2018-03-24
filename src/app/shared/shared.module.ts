import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
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
