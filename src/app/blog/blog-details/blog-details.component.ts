import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '../../../../node_modules/@angular/router';
import {BlogDetailsService} from './blog-details.service';

@Component({
  selector: 'dm-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blogId: any;
  url: string;

  blogPost = {
    id: 11111111,
    image: 'https://draftmatch.com/wp-content/uploads/2018/01/usa_today_10385104.0.jpg',
    subtitle: 'headline matchup',
    title: 'DraftMatch Headline Matchup Divisional Round: Tom Brady vs. Drew Brees',
    description: 'Headline matchups will continue here in DraftMatch, as we’re putting together two great matchups to see. Next Sunday, we’ll be witnessing two of the best quarterbacks in the league going head to head for this matchup, trying to succeed this postseason and win another championship. If they two can make it to the big game, we could see them clashing on the pitch besides this duel we’re about to introduce. Tom Brady and Drew Brees have several things in common this season and heading to the Divisional Round the two veterans are having a second youth; both players are keen to keep demonstrating their quality on the field. Maybe the difference between their respective rivals is a big one, but there is no doubt that these two can have remarkable games next Sunday. So let’s take a look at what these two can bring to the table. Here is our DraftMatch headline for the NFL divisional round, featuring Tom Brady vs Drew Brees.',
    author: 'Orlando Silva',
    time: '5 months ago',
    subtitleColor: 'red'
  }
  constructor(private route: ActivatedRoute,
              private blogDetailsService: BlogDetailsService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      console.log(param)
      this.url = param.url;
      this.blogId = param.id;
   //   this.getDetails();
    })
  }

  getDetails() {
    this.blogDetailsService.getBlogDetails(this.blogId)
    .subscribe(response => {
      // to do
      console.log(response)
    })
  }
}
