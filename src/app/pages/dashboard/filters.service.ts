import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { BaPropertiesModel } from "../../theme/services/baModel/BaPropertiesModel";
import * as _ from 'lodash';

declare var moment: any;

@Injectable()
export class FilterService {
  //filters
  selectedProperties = [];
  startDate: Date;
  endDate: Date;
  filterUpdated: EventEmitter<any> = new EventEmitter();


  constructor( private _af: AngularFire, private _BaPropertiesModel: BaPropertiesModel ) {
    // default property filter
    /*this._BaPropertiesModel.getDataObservable()
     .subscribe((value : any)=>{
     //LocalDataSource load the Properties data
     //_BaPropertiesModel.getData returns the data in the right format
     //this.listData.load asynch load for ng2-smart-table
     if(value.$exists()){
     this.selectedProperties.push(Object.keys(value)[0]);
     }
     });*/
  }

  public filterData( propertiesObject: Object ) {
    let filterData;
    let concatArray;
    // filter will alwasy be excuted by the below order
    // 1 -  concat all the properties lines/data to one array
    // 2 - Filter by properties
    // 3 - Filter by dates

    concatArray = this.concatPropertiesArray(propertiesObject);
    filterData = this.getFilterDataByProperties(concatArray);
    filterData = this.filterDataByDates(filterData);
    return filterData;
  }

  private concatPropertiesArray( propertiesArray: Object ): Array <string> {
    let propertyDataArr = [];
    for (let key in propertiesArray) {
      propertyDataArr = _.concat(propertyDataArr, propertiesArray[ key ]);
    }
    return propertyDataArr;
  }

  // filter the data by the properties filter
  public getFilterDataByProperties( propertiesArray: Array<string> ): Array <string> {
    //check if there are properties in the filter
    if (propertiesArray.length < 1) return [];
    //check if there are dates in the filter - we need both dates to run filter
    if (!this.endDate || !this.startDate) return [];

    // than filter it
    let tempArr =  _.filter(propertiesArray, ( o: any ) => {
      return _.indexOf(this.selectedProperties, o.PropertyID) > -1;
    });

    return tempArr;


  }

  //filter the data by the filter dates
  public filterDataByDates( propertiesArray: Array<string> ) {
    //check if there are dates in the filter - we need both dates to run filter
    if (!this.endDate || !this.startDate) return [];
    //check if there are properties in the filter
    if (propertiesArray.length < 1) return [];


    let validFilterDates = [];
    let obj: any;
    obj = propertiesArray[ 0 ];


    //todo ran - improve performance

    propertiesArray = _.forEach (propertiesArray , (value : any, k) => {
      let startDate = moment(this.startDate, 'MM-DD-YYYY');
      let endDate = moment(this.endDate, 'MM-DD-YYYY');
      for (let key in value) {
        if (value.hasOwnProperty(key) && this.isValidDate(key)) {
          let date = moment(key);
          //  valid date is  if startDate <= Date < endDate
          if (!(date.isSameOrAfter(startDate , 'day') && (date.isBefore(endDate , 'day')))) {
            delete value[key];
          }
        }
      }
    });
    return propertiesArray;
  }

  private  isValidDate( str ) {
    let d = moment(str, 'MM-DD-YYYY');
    if (d == null || !d.isValid()) return false;

    return str.indexOf(d.format('D-M-YYYY')) >= 0
      || str.indexOf(d.format('DD-MM-YYYY')) >= 0
      || str.indexOf(d.format('MM-DD-YYYY')) >= 0
      || str.indexOf(d.format('M-D-YYYY')) >= 0
      || str.indexOf(d.format('D/M/YY')) >= 0
      || str.indexOf(d.format('D/M/YY')) >= 0
      || str.indexOf(d.format('DD/MM/YY')) >= 0;
  }

  public setDates( startDate: Date, endDate: Date ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.filterUpdated.emit({
      filters: {
        startDate: this.startDate,
        endDate: this.endDate,
        selectedProperties: this.selectedProperties
      }
    });


  }

  public setStartDate( startDate: Date ) {
    this.startDate = startDate;
    this.filterUpdated.emit({
      filters: {
        startDate: this.startDate,
        endDate: this.endDate,
        selectedProperties: this.selectedProperties
      }
    });

  }

  public setEndDate( endDate: Date ) {
    this.endDate = endDate;
    this.filterUpdated.emit({
      filters: {
        startDate: this.startDate,
        endDate: this.endDate,
        selectedProperties: this.selectedProperties
      }
    });

  }

  public setSelectedProperties( selectedProperties: Array<string> ) {
    this.selectedProperties = selectedProperties;
    this.filterUpdated.emit({
      filters: {
        startDate: this.startDate,
        endDate: this.endDate,
        selectedProperties: this.selectedProperties
      }
    });

  }

  public getDates() {
    return {startDate: this.startDate, endDate: this.endDate}
  }

  public getStartDate() {
    return this.startDate;
  }

  public getEndDate() {
    return this.endDate;
  }

  public getSelectedProperties() {
    return this.selectedProperties;
  }

  public getFilters() {
    return {
      startDate: this.startDate,
      endDate: this.endDate,
      selectedProperties: this.selectedProperties
    };
  }
}

