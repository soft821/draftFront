import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {BlogRoutingModule} from './blog-routing';
import {BlogListComponent} from './blog-list/blog-list.component';
import {BlogComponent} from './blog.component';
import {BlogItemComponent} from './blog-item/blog-item.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';


@NgModule({
  imports: [
    BlogRoutingModule,
    SharedModule
  ],
  declarations: [
    BlogListComponent,
    BlogComponent,
    BlogItemComponent,
    CreateBlogComponent
  ],
  exports: [
  ]
})
export class BlogModule {
}
