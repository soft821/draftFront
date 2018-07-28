import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'dm-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss']
})
export class BlogItemComponent implements OnInit {

  constructor() { }

  @Input() image;
  @Input() subtitle;
  @Input() title;
  @Input() description;
  @Input() author;
  @Input() time;
  @Input() subtitleColor;
  @Output() getBlogDetails: EventEmitter<any> = new EventEmitter;
  @Output() getUserDetails: EventEmitter<any> = new EventEmitter;

  dotOptions = [
    {id: 0, name: 'Edit', icon: 'fa fa-pencil-square-o'},
    {id: 1, name: 'Delete', icon: 'fa fa-times'}
  ]
  ngOnInit() {
  }

  getUrl() {
    return `url(${this.image})`;
  }

  optionSelected(event) {
    console.log(event)
  }

  goToDetails() {
    this.getBlogDetails.emit(this.title);
  }

  goToUser() {
    this.getUserDetails.emit(this.author);
  }

}
