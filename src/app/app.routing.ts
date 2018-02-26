import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {HomeComponent} from '../app/home/home.component';
import {ErrorComponent} from '../app/error/error.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: '**', component: ErrorComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}