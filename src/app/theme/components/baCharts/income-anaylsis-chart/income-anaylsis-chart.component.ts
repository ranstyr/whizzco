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
    if (this.el.nativeElement && this._dataService.getCurrentTab()==='financial') {
      let data : any;
      data = this.calculateData(propertiesFilterdData , xAxisDate);

      Highcharts.setOptions({
        lang: {
          thousandsSep: ','
        }
      });
      Highcharts.chart('incomeAnaylsisChartContainer', {
        chart: {
          type: 'column',
          backgroundColor: null

        },
        title: {
          text: 'Income Analysis'
        },
        xAxis: {
          categories: xAxisDate
        },
        yAxis: {
          min: 0 /*Math.max.apply(null, data.residentialRental[0]) * 0.8*/,
          tickInterval: 10000,
          stackLabels: {
            formatter: function () {
              return Highcharts.numberFormat(this.total, 2);
            },
            enabled: false,
            style: {
              fontWeight: 'bold',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
          },
          title: {
            text: ''
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: $<b>{point.y:.2f}</b> ({point.percentage:.0f}%)<br/>',
          shared: true
        },
        navigation: {
          buttonOptions: {
            theme: {
              fill: "#71B0D9",
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
        plotOptions: {
          column: {
            stacking: 'normal',
          }
        },
        series: data
      });


    }
  }
}
