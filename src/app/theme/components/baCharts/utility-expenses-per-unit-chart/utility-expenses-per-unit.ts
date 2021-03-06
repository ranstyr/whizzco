/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { DataService } from "../../../../pages/dashboard/data.service";
import * as _ from 'lodash';


@Component({
  selector: 'utility-expenses-per-unit',
  template: `
       <div #chart id="utility-expenses-per-unit-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class UtilityExpensesPerUnitComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input('dataUpdated') dataUpdated: EventEmitter<any>;
  @Input('propertiesData') propertiesData: Object;

  @ViewChild('chart') el: ElementRef;


  constructor( private _dataService: DataService ) {

  }

  ngAfterViewInit() {
    this.dataUpdated.subscribe(
      ( res ) => {
        if (!(_.isEmpty(res.data.propertiesFilterdData)&&
              _.isEmpty(res.data.xAxisDate) &&
              _.isEmpty(res.data.filterPropertiesArray))) {
          this.renderChart(res.data.propertiesFilterdData, res.data.xAxisDate , res.data.filterPropertiesArray);
        }
      });
  }

  private calculateData( propertiesFilterdData, xAxisDate , filterPropertiesArray ) {
    /*  series: [ {
     type: 'pie',
     name: 'Expense amount',
     innerSize: '80%',
     data: [{
     name: 'Electricity',
     y: 130.71
     }, {
     name: 'Water',
     y: 4192.3,
     sliced: true,
     selected: true
     }, {
     name: 'Garbage and Recycling',
     y: 3930.36
     }]
     } ]
     */
    let sumUnits = this._dataService.calculateSumAttributeforArray(filterPropertiesArray , 'Units');


    let electricity = this._dataService.getElectricityMetrixForSelectedDates(propertiesFilterdData);
    electricity = this._dataService.objectValeuSum(electricity);
    electricity = electricity / sumUnits;


    let water = this._dataService.getWaterMetrixForSelectedDates(propertiesFilterdData);
    water = this._dataService.objectValeuSum(water);
    water = water / sumUnits;


    let garbageandRecycling = this._dataService.getGarbageandRecyclingMetrixForSelectedDates(propertiesFilterdData);
    garbageandRecycling = this._dataService.objectValeuSum(garbageandRecycling);
    garbageandRecycling = garbageandRecycling / sumUnits;


    return [{
      name: 'Electricity',
      y: electricity
    }, {
      name: 'Water',
      y: water,
      sliced: true,
      selected: true
    }, {
      name: 'Garbage and Recycling',
      y: garbageandRecycling
    }];
  }

  public renderChart( propertiesFilterdData, xAxisDate , filterPropertiesArray ) {
    if (this.el.nativeElement && this._dataService.getCurrentTab()==='operation') {
      let data = this.calculateData(propertiesFilterdData, xAxisDate , filterPropertiesArray);

      Highcharts.setOptions({
        lang: {
          thousandsSep: ','
        }
      });
      Highcharts.chart('utility-expenses-per-unit-container', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          backgroundColor: null

        },
        title: {
          text: 'Utility Expenses Per Unit'
        },
        tooltip: {
          pointFormat: '<b>${point.y:.2f}</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            showInLegend: true,
            dataLabels: {
              enabled: false,
              style: {
                fontWeight: 'bold',
                color: '#0F1A36'
              }
            },
          }
        },
        navigation: {
          buttonOptions: {
            theme: {
              fill: "#5B8DB5",
              states: {
                hover: {
                  fill: '#5585C0'
                },
                select: {
                  stroke: '#039',
                  fill: '#5585C0'
                }
              }
            }
          }
        },
        series: [ {
          name: 'Brands',
          colorByPoint: true,
          innerSize: '80%',
          data: data
        } ]
      });
    }


  }

}
