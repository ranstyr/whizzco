import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from "angularfire2";

import * as _ from 'lodash';


@Injectable()
export class BaPropertiesModel {
  _ref: FirebaseObjectObservable<any>;
  _propertiesData: any;

  constructor( private _af: AngularFire ) {
  }

  public getDataObservable(): FirebaseObjectObservable<any> {
    this._ref = this._af.database.object(localStorage.getItem('company') + `/properties`);
    this._ref.subscribe(
      value => console.log("properties reterived from firebase : ", (value ? Object.keys(value) : null)),
      err => console.error("error at BaPropertiesModel - _ref.subscribe", err + err ? err.message : err)
    );
    return this._ref;
  }

  /**
   * Modify angularfire data and transform it to the correct structure
   *
   * @param {object} angular fire object
   * @returns {string}
   */
  public getData( value: any ) {
    let _Data = [];
    let tempArr = value;
    if (!(_.isEmpty(tempArr))) {
      for (let key in tempArr) {
        if (!(_.isEmpty(tempArr[ key ]))) {
          _Data.push(tempArr[ key ]);
        }
      }
      this._propertiesData = _Data;
      return _Data;
    } else return null;

  }
}
