
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlogListComponent} from './blog-list/blog-list.component';
import {BlogComponent} from './blog.component';
import {CreateBlogComponent} from './create-blog/create-blog.component';
import {AuthGuard} from '../core/auth/auth-guard.service';

const BLOG_ROUTES: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: BlogListComponent},
      {path: 'create', component: CreateBlogComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(BLOG_ROUTES)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
