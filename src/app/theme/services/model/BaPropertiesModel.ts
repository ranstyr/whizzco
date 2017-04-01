import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { AngularFire, FirebaseObjectObservable } from "angularfire2";

@Injectable()
export class BaPropertiesModel {
  _ref: FirebaseObjectObservable<any>;
  _propertiesData: any;

  constructor( private _af: AngularFire ) {
    this._ref = this._af.database.object(localStorage.getItem('company') + `/properties`);
    this._ref.subscribe(
      value => console.log("properties data reterived from firebase : " + value ? value.data : null),
      err => console.error("error at BaPropertiesModel - _ref.subscribe" + err + err ? err.message : err)
    );
  }

  public getDataObservable(): FirebaseObjectObservable<any> {
    return this._ref;
  }

  /**
   * Modify angularfire data and transform it to the correct structure
   *
   * @param {object} angular fire object
   * @returns {string}
   */
  public getData(value : any) {
    let _Data = [];
    let tempArr = value ? value.data : null;
    if (tempArr) {
      for (let key in tempArr) {
        _Data.push(tempArr[ key ]);
      }
      this._propertiesData = _Data;
      return _Data;
    } else return null;

  }
}
