import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';


/*
 * GlobalStateService
 * Can be used to share data between components - just like $rootScope.$broadcast/$rootScope.$on in Angular 1
 * Example:
 * GlobalStateService.notifyDateChanged('eventName', { key: 123 });
 * GlobalStateService.subscribe('eventName', (data) => { alert(data.key); // 123})
 * */
@Injectable()
export class GlobalStateService {

  private _data = new Subject<Object>();
  private _dataStream$ = this._data.asObservable();

  private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

  constructor() {
    this._dataStream$.subscribe((data) => this._onEvent(data));
  }

  notifyDataChanged(event, value: { value: any }) {
    const current = this._data[event];
    if (current !== value) {
      this._data[event] = value;
      this._data.next({
        event: event,
        data: this._data[event]
      });
    }
  }

  subscribe(event: string, callback: Function) {
    const subscribers = this._subscriptions.get(event) || [];
    subscribers.push(callback);

    this._subscriptions.set(event, subscribers);
  }

  _onEvent(data: any) {
    const subscribers = this._subscriptions.get(data['event']) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }
}
