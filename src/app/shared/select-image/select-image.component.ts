import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ImageResult} from 'ng2-imageupload';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'dm-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.scss']
})
export class SelectImageComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() displayAvatar: boolean;
  @Input() displayDefaultImage: boolean;
  @Input() fullWidth: boolean;
  @Input() background: string;
  @Input() showMediaIcon: boolean;
  @Input() modalWidth: boolean;
  @Input() hideDelete: boolean;
  @Input() neverHideLabel: boolean;
  @Input() customBackground: boolean;
  @Output() imageSelected: EventEmitter<any> = new EventEmitter<any>();

  pictureLoaded = false;
  src = '';
  uploader: FileUploader = new FileUploader({
    allowedFileType: ['image'],
    autoUpload: true
  });
  files: any;
  @ViewChild('fileInput') fileInput;
  
  constructor() { }

  ngOnInit() {
    if (this.form.get('image').value !== '') {
      this.loadSelectedImage(this.form.get('image').value);
    }
  }

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  fileSelected(e: any) {
    this.files = e.target.files || e.srcElement.files;
    this.pictureLoaded = true;
    let lastIdx = this.uploader.queue.length - 1;
    if (this.uploader.queue.length) {
      this.form.get('image').setValue(this.uploader.queue[lastIdx]);
      this.imageSelected.emit(this.files);
    }
  }
  
  // show image preview
  selected(imageResult: ImageResult) {
    this.src = imageResult.dataURL;
  }

  loadSelectedImage(dataUrl) {
    this.src = dataUrl;
    this.pictureLoaded = true;
  }

  deselectFile() {
    this.pictureLoaded = false;
    this.src = '';
    this.form.get('image').setValue('');
    this.imageSelected.emit(this.files);
    let lastIdx = this.uploader.queue.length - 1;
    if (this.uploader.queue.length) {
      this.fileInput.nativeElement.value = '';
      this.uploader.queue[lastIdx].remove();
    } 
  }

  getImage() {
    return `url(${this.src})`;
  }

}
