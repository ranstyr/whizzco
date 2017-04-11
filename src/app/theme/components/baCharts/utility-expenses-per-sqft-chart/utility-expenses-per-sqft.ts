/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { DataService } from "../../../../pages/dashboard/data.service";


@Component({
  selector: 'utility-expenses-per-sqft',
  template: `
       <div #chart id="utility-expenses-per-sqft-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class UtilityExpensesPerSqftComponent {
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
        if (res.data.propertiesFilterdData) {
          this.renderChart(res.data.propertiesFilterdData, res.data.xAxisDate);
        }
      });
  }

  private calculateData( propertiesFilterdData, xAxisDate ) {
    /*  series:   [{
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
     */

    let electricity = this._dataService.getElectricityMetrixForSelectedDates(propertiesFilterdData);
    electricity = this._dataService.objectValeuSum(electricity);

    let water = this._dataService.getWaterMetrixForSelectedDates(propertiesFilterdData);
    water = this._dataService.objectValeuSum(water);

    let garbageandRecycling = this._dataService.getGarbageandRecyclingMetrixForSelectedDates(propertiesFilterdData);
    garbageandRecycling = this._dataService.objectValeuSum(garbageandRecycling);

    return [ {
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
    } ];
  }

  public renderChart( propertiesFilterdData, xAxisDate ) {
    if (this.el.nativeElement && this._dataService.getCurrentTab()==='operation') {
      let data = this.calculateData(propertiesFilterdData, xAxisDate);

      Highcharts.setOptions({
        lang: {
          thousandsSep: ','
        }
      });
      Highcharts.chart('utility-expenses-per-sqft-container', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          backgroundColor: null

        },
        title: {
          text: 'Utility Expenses Per Sqft'
        },
        tooltip: {
          pointFormat: '<b>${point.y}</b>'
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
