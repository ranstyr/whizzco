import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FilterService } from "../filters.service";
import { BaPropertiesDataModel } from "../../../theme/services/baModel/BaPropertiesDataModel";
import { FirebaseObjectObservable } from "angularfire2";

import * as _ from 'lodash';

@Component({
  selector: 'page-component',
})

export class PageDashboard {

  filters: any;
  _BaPropertiesDataModelRef: FirebaseObjectObservable<any>;
  _propertiesData: Object;
  _propertiesFilterdData: Object;
  _xAxisDate : Array<string>;
  _selectedProperties : Object;
  dataUpdated: EventEmitter<any> = new EventEmitter();

  constructor( private _filters: FilterService, private _BaPropertiesDataModel: BaPropertiesDataModel ) {
  }


  ngOnInit() {
    //filter changed
    this._filters.filterUpdated.subscribe(
      ( filters ) => {
        this.filters = this._filters.getFilters();
        let tempObj = _.cloneDeep(this._propertiesData);
        this._propertiesFilterdData = this._filters.filterData(tempObj );
        this._selectedProperties = this._filters.getSelectedProperties();
        this._xAxisDate = this._filters.getXAxisDate();
        this.dataUpdated.emit({
          data: {
            filters : this.filters,
            propertiesFilterdData: this._propertiesFilterdData,
            xAxisDate: this._xAxisDate,
          }
        });
      }
    );

    this._BaPropertiesDataModelRef = this._BaPropertiesDataModel.getModelObservable();
    this._BaPropertiesDataModelRef.subscribe(( snapshot: any ) => {
      this._propertiesData = snapshot;
    });
  }



}
