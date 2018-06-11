import { Injectable } from '@angular/core';

@Injectable()
export class ColorPickerService {

  colorOptions = [
    {_id: '#000000', name: "Black"},
    {_id: '#b1abab', name: "Gray"},
    {_id: '#d98282', name: "Light red"},
    {_id: '#e30f32', name: 'Red'},
    {_id: '#a3001b', name: 'Dark red'},
    {_id: '#ff6600', name: 'Orange'},
    {_id: '#ffa163', name: 'Sand'},
    {_id: '#ffde00', name: 'Yellow'},
    {_id: '#a3f792', name: 'Lime'},
    {_id: '#2aff00', name: 'Green'},
    {_id: '#1a7f06', name: 'Dark green'},
    {_id: '#00e4ff', name: 'Sky'},
    {_id: '#0072ff', name: 'Blue'},
    {_id: '#8322bb', name: 'Purple'},
  ];

  constructor() { }

  getColorOptions() {
    return this.colorOptions;
  }

}
