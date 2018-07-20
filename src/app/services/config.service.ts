import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _api: String;
  
  static set(property, value) {
    this['_' + property] = value;
  }
  static get(property) {
    return this['_' + property];
  }

  constructor() { }
}
