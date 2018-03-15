import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

export const APP_ROUTES: Routes = [
    // Default page
    {path: '', redirectTo: 'main/home', pathMatch: 'full'},
    {path: '**', redirectTo: 'error'}
  ];

/**
 * Main module routing
 *
 * Link to about module with lazy-loading, and instead to home component
 */
@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES, {useHash: true})],
    exports: [RouterModule]
  })
export class AppRoutingModule {}