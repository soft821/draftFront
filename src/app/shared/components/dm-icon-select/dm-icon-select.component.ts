import {
  Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnChanges, OnInit,
  Output, ViewChild
} from '@angular/core';
import * as _ from 'underscore';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HelperService} from "../../../core/helper.service";
import {ScrollbarComponent} from "ngx-scrollbar";

const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DmIconSelectComponent),
  multi: true
};

@Component({
  selector: 'dm-icon-select',
  templateUrl: './dm-icon-select.component.html',
  styleUrls: ['./dm-icon-select.component.scss'],
  providers: [MULTISELECT_VALUE_ACCESSOR]
})
export class DmIconSelectComponent implements OnInit, ControlValueAccessor {
  
  @ViewChild(ScrollbarComponent) scrollRef: ScrollbarComponent;
  public _ = _;
  selectOpen = false;
  selected = {};
  isHovered = false;
  @Input() placeholder;
  @Input() colorActive;
  @Input() colorHovered = '';
  @Input() keys;
  @Input() options;
  @Input() icon;
  @Input() xsmall;
  @Input() small;
  @Input() disable = false;
  @Input() noTranslate = false;
  @Output() optionSelected: EventEmitter<any> = new EventEmitter();
  
    constructor(private _elementRef: ElementRef,
                public helperService: HelperService) {}
  
    ngOnInit() {
      this.options.forEach(element => {
        element.hovered = false;
      });
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
      if (!this.disable)
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
  
    getColorActive(condition, isHovered = false) {
      if (!this.selectOpen || !condition) {
        if (isHovered) {
          return this.colorHovered || '#ed1e1e';
        } else {
          return '';
        }
      }
  
      if (isHovered) {
        return this.colorHovered || '#ed1e1e';
      } else {
        return this.colorActive;
      }
    }
  }
  