import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { BaPropertiesModel } from "../../theme/services/baModel/BaPropertiesModel";
import * as _ from 'lodash';

declare let moment: any;
declare let alasql: any;

@Injectable()
export class FilterService {
  //filters
  selectedProperties = [];
  startDate: Date;
  endDate: Date;
  xAxisDate: Array<string>;
  filterUpdated: EventEmitter<any> = new EventEmitter();
  _propertiesFilterdData: Object;


  constructor( private _af: AngularFire, private _BaPropertiesModel: BaPropertiesModel ) {
  }

  public filterData( propertiesObject: Object ) {
    let filterData;
    let concatArray;
    this.xAxisDate = [];
    // filter will alwasy be excuted by the below order
    // 1 -  concat all the properties lines/data to one array
    // 2 - Filter by properties
    // 3 - Filter by dates

    //check if there are dates in the filter - we need both dates to run filter
    if (!this.endDate || !this.startDate) return [];

    concatArray = this.concatPropertiesArray(propertiesObject);

    //check if there are properties in the filter
    if (concatArray.length < 1) return [];

    filterData = this.getFilterDataByProperties(concatArray);
    filterData = this.filterDataByDates(filterData);
    filterData = this.getAggregateArray(filterData);
    this._propertiesFilterdData = filterData;
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
    let tempArr = _.filter(propertiesArray, ( o: any ) => {
      return _.indexOf(this.selectedProperties, o.PropertyID) > -1;
    });

    return tempArr;


  }


  // filter the data by the properties filter
  public getAggregateArray( propertiesArray: Array<string> ): Object {
    //check if there are properties in the filter
    if (propertiesArray.length < 1) return [];
    //check if there are dates in the filter - we need both dates to run filter
    if (!this.endDate || !this.startDate) return [];

    // than filter it
    let tempObj = _.groupBy(propertiesArray, "MetricName");
    let resultObj = {};
    for (let metricNameKey in tempObj) {
      resultObj[ metricNameKey ] = {};
      let metricNameArr = tempObj[ metricNameKey ];
      for (let index = 0; index < metricNameArr.length; index++) {
        let obj: Object;
        obj = metricNameArr[ index ];
        for (let dateKey in obj) {
          if (dateKey !== 'MetricName') {
            let date = moment(dateKey, 'MM-DD-YYYY');
            if (date.isValid()) {
              //convert null to 0;
              let currentValue = resultObj[ metricNameKey ][ dateKey ] ? resultObj[ metricNameKey ][ dateKey ] : 0;
              let newValue = tempObj[ metricNameKey ][ index ][ dateKey ];
              resultObj[ metricNameKey ][ dateKey ] = currentValue + newValue;
            }
            else if (index === 0 && !date.isValid() && dateKey !== 'PropertyID') {
              resultObj[ metricNameKey ][ dateKey ] = tempObj[ metricNameKey ][ index ][ dateKey ];
            };
          }
        }
      }
    }
    return resultObj;
  }


  //filter the data by the filter dates
  public filterDataByDates( propertiesArray: Array<string> ) {
    //check if there are dates in the filter - we need both dates to run filter
    if (!this.endDate || !this.startDate) return [];
    //check if there are properties in the filter
    if (propertiesArray.length < 1) return [];


    let obj: any;
    obj = propertiesArray[ 0 ];


    //todo ran - improve performance

    propertiesArray = _.forEach(propertiesArray, ( value: any, index ) => {
      let startDate = moment(this.startDate, 'MM-DD-YYYY');
      let endDate = moment(this.endDate, 'MM-DD-YYYY');
      for (let key in value) {
        if (value.hasOwnProperty(key) && this.isValidDate(key)) {
          let date = moment(key, 'MM-DD-YYYY');
          //  valid date is  if startDate <= Date < endDate
          if (!(date.isSameOrAfter(startDate, 'day') && (date.isBefore(endDate, 'day')))) {
            delete value[ key ];
          } else if (index === 0) {
            this.xAxisDate.push(key);
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
    return {startDate: this.startDate, endDate: this.endDate};
  }

  public getStartDate() {
    return this.startDate;
  }

  public getEndDate() {
    return this.endDate;
  }

  public getSelectedProperties() {
    if (this.selectedProperties) {
      console.log("After filtering the selectedProperties are - " + this.selectedProperties.toString());
    }
    return this.selectedProperties;
  }

  public getFilters() {
    return {
      startDate: this.startDate,
      endDate: this.endDate,
      selectedProperties: this.selectedProperties
    };
  }

  public getXAxisDate() {
    if (this.xAxisDate) {
      console.log("After filtering the X Axis Dats are - " + this.xAxisDate.toString());
    }
    return this.xAxisDate;
  }

  public getPropertiesFilterdData (){
    return (this._propertiesFilterdData) ? this._propertiesFilterdData : {};
  }

}

