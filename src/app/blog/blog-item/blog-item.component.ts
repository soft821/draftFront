import {Component, OnInit, Input} from '@angular/core';

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
  
  dotOptions = [
    {id: 0, name: 'Edit', icon: 'fa fa-pencil-square-o'},
    {id: 1, name: 'Delete', icon: 'fa fa-times'}
  ]
  ngOnInit() {
    console.log(this.image)
  }

  getUrl() {
    return `url(${this.image})`;
  }

  optionSelected(event) {
    console.log(event)
  }

}
