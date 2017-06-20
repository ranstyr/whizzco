/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { DataService } from "../../../../pages/dashboard/data.service";

declare let math;

@Component({
  selector: 'income-anaylsis-chart',
  template: `
       <div #chart id="incomeAnaylsisChartContainer" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class IncomeAnaylsisChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input('dataUpdated') dataUpdated: EventEmitter<any>;
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

  private calculateData( propertiesFilterdData , xAxisDate) {
    /*  series: [{
     name: 'CAM',
     data: [189, 189, 189, 189, 189, 189, 189, 189, 189, 189, 189, 189]
     }, {
     name: 'Other',
     data: [0, 0, 19, 19, 19, 0, 0, 0, 0, 0, 0, 0]
     }, {
     name: 'Commercial Rental',
     data: [2900, 2900, 2900, 2900, 2900, 2900, 2900, 2900, 2900, 2900, 2900, 2900]
     }, {
     name: 'Residential Rental',
     data: [14718, 14718, 14718, 14748, 14748, 14748, 14748, 14748, 14748, 14748, 14748, 14748]
     }]
     categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
     */

    let CAM =  (propertiesFilterdData[ 'CAM' ]);
    CAM = this._dataService.transformObjectToArray(CAM);

    let other =  (propertiesFilterdData[ 'Other' ]);
    other = this._dataService.transformObjectToArray(other);

    let residentialRental =  (propertiesFilterdData[ 'Residential Rental' ]);
    residentialRental = this._dataService.transformObjectToArray(residentialRental);

    let commercialRental =  (propertiesFilterdData[ 'Commercial Rental' ]);
    commercialRental = this._dataService.transformObjectToArray(commercialRental);


    return [{
      name: 'CAM',
      data: CAM
    }, {
      name: 'Other',
      data: other
    }, {
      name: 'Commercial Rental',
      data: commercialRental
    }, {
      name: 'Residential Rental',
      data: residentialRental
    }];

  }



  public renderChart( propertiesFilterdData, xAxisDate  ) {


      Highcharts.setOptions({
        lang: {
          thousandsSep: ','
        }
      });
      Highcharts.chart('incomeAnaylsisChartContainer', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          backgroundColor: null

        },
        title: {
          text: 'Browser market shares'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
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
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: [{
            name: 'Microsoft Internet Explorer',
            y: 56.33
          }, {
            name: 'Chrome',
            y: 24.03,
            sliced: true,
            selected: true
          }, {
            name: 'Firefox',
            y: 10.38
          }, {
            name: 'Safari',
            y: 4.77
          }, {
            name: 'Opera',
            y: 0.91
          }, {
            name: 'Proprietary or Undetectable',
            y: 0.2
          }]
        }]
      });
    }
  }

