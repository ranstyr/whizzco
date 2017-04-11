import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2";
import { Subject } from "rxjs";

@Injectable()
export class BaPropertiesDataModel {
  _ref: FirebaseObjectObservable<any>;
  _propertiesData: any;

  _propertiesRef: FirebaseObjectObservable<any>;

  constructor( private _af: AngularFire ) {
  }


  getModelObservable() {
    this._propertiesRef = this._af.database.object(localStorage.getItem('company') + '/propertiesData');
    this._propertiesRef.subscribe(
      value => {
        console.log("properties data reterived from firebase : ", (value ? Object.keys(value) : null));
        this._propertiesData = value;
      },
      err => console.error("error at BaPropertiesModel - _ref.subscribe" + err + err ? err.message : err)
    );
    return this._propertiesRef;
  }

  filterByProperties( propertiesId: Array<Object> ) {
    this._propertiesRef = this._af.database.object(localStorage.getItem('company') + '/propertiesData');
  }

  public getDataObservable(): FirebaseObjectObservable<any> {
    this._propertiesRef = this._af.database.object(localStorage.getItem('company') + '/propertiesData');
    this._propertiesRef.subscribe(
      value => {
        console.log("properties data reterived from firebase : ", (value ? value.data : null));
        this._propertiesData = value;
      },
      err => console.error("error at BaPropertiesModel - _ref.subscribe" + err + err ? err.message : err)
    );
    return this._propertiesRef;
  }

  /**
   * Modify angularfire data and transform it to the correct structure
   *
   * @param {object} angular fire object
   * @returns {string}
   */
  public getData( value: any ) {
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
