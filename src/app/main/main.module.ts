import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MainComponent} from './main.component';
import {MainRoutingModule} from './main.routing';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './../shared/navbar/navbar.component';
import {BlogComponent} from './blog/blog.component';
import {MenuComponent} from './menu/menu.component';


@NgModule({
  imports: [
    MainRoutingModule,
    SharedModule.forRoot()
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    NavComponent,
    BlogComponent,
    MenuComponent
  ],
  exports: [
    NavComponent,
    BlogComponent
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class MainModule {
}
