import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'dm-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  blogForm: FormGroup;
  sectionsForm: FormGroup;
  files: any;
  
  addMoreSectionsForm = false;

  colors = [
    {id: 0, name: 'Red', value: 'red'},
    {id: 1, name: 'Green', value: 'green'},
    {id: 2, name: 'Blue', value: 'blue'},
    {id: 3, name: 'Purple', value: 'purple'},
    {id: 4, name: 'Red', value: 'red'},
    {id: 5, name: 'Red', value: 'red'},
  ];

  blogTypes = [
    {id: 0, name: 'headline_matchup', value: 'Headline Matchup'},
    {id: 1, name: 'preview', value: 'Preview'},
    {id: 2, name: 'android', value: 'Android'},
    {id: 3, name: 'strategy', value: 'Strategy'},
    {id: 4, name: 'uncategorized', value: 'Uncategorized'},
    {id: 5, name: 'draftmatch', value: 'Draftmatch'},
    {id: 6, name: 'history', value: 'History'},
    {id: 7, name: 'news', value: 'News'},
    {id: 8, name: 'post-season', value: 'Post season'}
  ];

  ngOnInit() {

    this.blogForm = this.fb.group({
      type: ['', [Validators.required]],
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      image: [''],
      color: '',
      trackVersions: '',
      requireApproval: '',
      recordAudio: '',
      sections: this.fb.array([]),
    });
    this.sectionsForm = this.fb.group({
      title: ['', [Validators.required]],
      from: [new Date(), [Validators.required]],
      to: [new Date(), [Validators.required]],
      description: ['', Validators.required]
    });
  };

  addMore() {
   this.addMoreSectionsForm = true;
  };

  imageSelected(event) {
    this.files = event;
    console.log(event, 'imageSelected')
  }

}
