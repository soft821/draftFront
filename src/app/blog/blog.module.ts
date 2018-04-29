import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {BlogRoutingModule} from './blog-routing';

@NgModule({
  imports: [
    BlogRoutingModule,
    SharedModule
  ],
  declarations: [
  ]
})
export class AuthenticationModule {
}
