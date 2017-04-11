import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FilterService } from "../filters.service";
import { BaPropertiesDataModel } from "../../../theme/services/baModel/BaPropertiesDataModel";
import { FirebaseObjectObservable } from "angularfire2";
import { BaPropertiesModel } from "../../../theme/services/baModel/BaPropertiesModel";
import { DataService } from "../data.service";

import * as _ from 'lodash';


@Component({
  selector: 'page-component',
})

export class PageDashboard {

  filters: any;
  _BaPropertiesDataModelRef: FirebaseObjectObservable<any>;
  _BaPropertiesModelRef: FirebaseObjectObservable<any>;

  _propertiesData: Object;
  _filterdPropertiesDataArray: Object;
  _xAxisDate: Array<string>;
  _selectedProperties: Object;
  _filterPropertiesArray: Array<string>;
  dataUpdated: EventEmitter<any> = new EventEmitter();
  _properties: Array<string>;


  constructor( private _filters: FilterService,
               private _BaPropertiesDataModel: BaPropertiesDataModel,
               private _dataService: DataService,
               private _BaPropertiesModel: BaPropertiesModel ) {
  }


  ngOnInit() {
    //filter changed
    this._filters.filterUpdated.subscribe(
      ( filters ) => {
        this.filters = this._filters.getFilters();
        let tempObj = _.cloneDeep(this._propertiesData);
        this._filterdPropertiesDataArray = this._filters.filterData(tempObj);
        this._selectedProperties = this._filters.getSelectedProperties();
        this._filterPropertiesArray = this._filters.getFilterProperties(this._properties, this._filters.getSelectedProperties());
        this._xAxisDate = this._filters.getXAxisDate();
        this.dataUpdated.emit({
          data: {
            filters: this.filters,
            propertiesFilterdData: this._filterdPropertiesDataArray,
            xAxisDate: this._xAxisDate,
            filterPropertiesArray :this._filterPropertiesArray,
          }
        });

      }
    );

    this._BaPropertiesDataModelRef = this._BaPropertiesDataModel.getModelObservable();
    this._BaPropertiesDataModelRef.subscribe(( snapshot: any ) => {
      this._propertiesData = snapshot;
    });

    // properties data
    this._BaPropertiesModelRef = this._BaPropertiesModel.getDataObservable();
    this._BaPropertiesModelRef.subscribe(( value: any ) => {
      if (value.$exists()) {
        this._properties = this._BaPropertiesModel.getData(value);
      }
    });
  }


}
