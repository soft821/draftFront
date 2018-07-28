import {Component, OnInit} from '@angular/core';
import {BlogListService} from './blog-list.service';
import {Router} from '../../../../node_modules/@angular/router';

@Component({
  selector: 'dm-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  constructor(private blogListService: BlogListService,
              private router: Router) { }

  articles = [
    {
      image: 'https://draftmatch.com/wp-content/uploads/2018/01/usa_today_10385104.0-1024x683.jpg',
      subtitle: 'headline matchup',
      title: 'DraftMatch Headline Matchup Divisional Round: Tom Brady vs. Drew Brees',
      description: 'Headline matchups will continue here in DraftMatch, as we’re putting together two great matchups to see. Next Sunday, we’ll be witnessing two of the best quarterbacks in the league going head to head for this matchup, trying to succeed this postseason and win another championship. If they two can make it to the big game, we could see them clashing on the pitch besides this duel we’re about to introduce. Tom Brady and Drew Brees have several things in common this season and heading to the Divisional Round the two veterans are having a second youth; both players are keen to keep demonstrating their quality on the field. Maybe the difference between their respective rivals is a big one, but there is no doubt that these two can have remarkable games next Sunday. So let’s take a look at what these two can bring to the table. Here is our DraftMatch headline for the NFL divisional round, featuring Tom Brady vs Drew Brees.',
      author: 'Orlando Silva',
      time: '5 months ago',
      subtitleColor: 'red',
      id: 12121
    },
    {
      image: 'https://draftmatch.com/wp-content/uploads/2018/01/DB9-800x534.jpg',
      subtitle: 'headline matchup',
      title: 'DraftMatch Headline Matchup Divisional Round: Tom Brady vs. Drew Brees',
      description: 'Headline matchups will continue here in DraftMatch, as we’re putting together two great matchups to see. Next Sunday, we’ll be witnessing two of the best quarterbacks in the league going head to head for this matchup, trying to succeed this postseason and win another championship. If they two can make it to the big game, we could see them clashing on the pitch besides this duel we’re about to introduce. Tom Brady and Drew Brees have several things in common this season and heading to the Divisional Round the two veterans are having a second youth; both players are keen to keep demonstrating their quality on the field. Maybe the difference between their respective rivals is a big one, but there is no doubt that these two can have remarkable games next Sunday. So let’s take a look at what these two can bring to the table. Here is our DraftMatch headline for the NFL divisional round, featuring Tom Brady vs Drew Brees.',
      author: 'Orlando Silva',
      time: '5 months ago',
      subtitleColor: '#00bcd4',
      id: 1424521
    },
    {
      image: 'https://draftmatch.com/wp-content/uploads/2018/01/draftmatch_android-1024x682.jpg',
      subtitle: 'android',
      title: 'DraftMatch Android Released!',
      description: 'Headline matchups will continue here in DraftMatch, as we’re putting together two great matchups to see. Next Sunday, we’ll be witnessing two of the best quarterbacks in the league going head to head for this matchup, trying to succeed this postseason and win another championship. If they two can make it to the big game, we could see them clashing on the pitch besides this duel we’re about to introduce. Tom Brady and Drew Brees have several things in common this season and heading to the Divisional Round the two veterans are having a second youth; both players are keen to keep demonstrating their quality on the field. Maybe the difference between their respective rivals is a big one, but there is no doubt that these two can have remarkable games next Sunday. So let’s take a look at what these two can bring to the table. Here is our DraftMatch headline for the NFL divisional round, featuring Tom Brady vs Drew Brees.',
      author: 'admin',
      time: '5 months ago',
      subtitleColor: '#42f442',
      id: 12125331
    }
  ]
  ngOnInit() {
  }

  getUserDetails(event) { //get username of author
    console.log(event)
  }

  getBlogDetails(event, id) {
    console.log(event, id)
    let url = this.blogListService.convertToSlug(event);
    this.router.navigate(['blog/details', id, url])
    console.log(url)
  }
 
}
