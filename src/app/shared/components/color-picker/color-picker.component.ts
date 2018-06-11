import {Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, OnInit, Output} from '@angular/core';
import * as _ from 'underscore';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ColorPickerService} from './color-picker.service';
 
 const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ColorPickerComponent),
  multi: true
};

@Component({
  selector: 'dm-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [MULTISELECT_VALUE_ACCESSOR]
})
export class ColorPickerComponent implements OnInit, ControlValueAccessor {
  public _ = _;
  selectOpen = false;
  selected = {};
  isHovered = false;
  @Input() placeholder;
  @Input() colorActive;
  @Input() colorHovered = '';
  @Input() keys;
  @Input() noTranslate = false;
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();
  options = [];
  
    constructor(private _elementRef: ElementRef,
                private colorPickerService: ColorPickerService) { }
  
    ngOnInit() {
      this.options = this.colorPickerService.getColorOptions();
    }
  
    onModelChange: Function = (_: any) => {
    };
    onModelTouched: Function = () => {
    };
  
    writeValue(value) {
      if (value !== undefined && value !== null && _.find(this.options, (option) => _.isMatch(value, option))) {
        this.selected = value;
      } else {
        this.selected = {};
      }
    }
  
    registerOnChange(fn) {
      this.onModelChange = fn;
    }
  
    registerOnTouched(fn) {
      this.onModelTouched = fn;
    }
  
    toggleSelect() {
      this.selectOpen = !this.selectOpen;
    }
  
    @HostListener('document:click', ['$event.target'])
    onOutsideClick(targetElement) {
      const clickedInside = this._elementRef.nativeElement.contains(targetElement);
      if (!clickedInside) {
        this.selectOpen = false;
      }
    }
  
    selectItem(option) {
      this.selected = option;
      this.onModelChange(this.selected);
      this.onModelTouched();
      this.optionSelected.emit(option);
      this.toggleSelect();
    }
  
    getColorActive(condition) {
      if (!this.selectOpen || !condition) {
        return '';
      }
  
      return this.colorActive;
    }
}
