import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageComponent} from '../home/landing-page/landing-page.component';
import {HomeComponent} from './home.component';
import { IsUserLogged } from '../core/auth/authorized-check.service';

const HOME_ROUTES: Routes = [
    {
        path: '',  component: HomeComponent,
        canActivate: [IsUserLogged],
        children: [
            { path: '', component: LandingPageComponent }
        ]
    }
    
];

@NgModule({
  imports: [RouterModule.forChild(HOME_ROUTES)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
