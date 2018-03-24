import {NgModule} from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {AuthGuard} from '../core/auth/auth-guard.service';
import {MainComponent} from './main.component';
import {HomeComponent} from './home/home.component';
import {BlogComponent} from './blog/blog.component';

const MAIN_ROUTES: Routes = [
    { path: 'blog', component: BlogComponent },
        {
        path: 'main', component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(MAIN_ROUTES)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
