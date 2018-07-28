import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {CreateBlogService} from './create-blog.service';
import {Router} from '@angular/router';

@Component({
  selector: 'dm-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private createBlogService: CreateBlogService,
              private router: Router) { }

  blogForm: FormGroup;
  sectionsForm: FormGroup;
  sectionsFormSubmitted: boolean;
  files: any;

  sectionInputs = [];
  sections = [];
  newItemVisible = false;
  addMoreSectionsForm = false;

  blogTypes = [ // get from api
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
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      image: [''],
      color: '',
      category: '',
      sections: this.fb.array([]),
    });
    this.addNewItem();
  };

  addNewItem() {
    const control = <FormArray>this.blogForm.controls['sections'];
    control.push(this.initObject());
    /*  this.sectionsFormSubmitted = false;
      this.resetForm(); */
  };

  initObject() {
    return this.fb.group({
      title: [''],
      subtitle: [''],
      description: [''],
      image: ['']
    });
  };

  resetForm() {
    this.sectionsForm.reset();   
  };

  
  imageSelected(event) {
    this.files = event;
  }

  submitBlog(form) {
    if(form.valid && this.files) {
      this.createBlogService.createBlog(this.files[0], form.value)
      .subscribe(response => {
        console.log(response)
      })
    }
  }

  cancel() {
    this.router.navigate(['/blog']);
  }
}
