/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DataService } from "../../../../pages/dashboard/data.service";

@Component({
  selector: 'cash-reserves-chart',
  template: `
       <div #chart id="cash-reserves-chart-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class CashReservesChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input('dataUpdated') dataUpdated: EventEmitter<any>;
  @ViewChild('chart') el: ElementRef;


  constructor(private _dataService: DataService ) {

  }

  ngAfterViewInit() {
    this.dataUpdated.subscribe(
      ( res ) => {
        if (res.data.propertiesFilterdData) {
          this.renderChart(res.data.propertiesFilterdData, res.data.xAxisDate);
        }
      });
  }

  private calculateData( propertiesFilterdData ) {
    /*  series: [ {
     name: '2BL',
     data: [ 13759.78, 13770.81, 13343.72, 7518.75, 13330.22, 13748.75, 7101.22, 13316.22, 13028.87, 7291.22, 16788.75, 1000 ]
     }, {
     name: 'CBB',
     data: [ 12040.09, 19057.94, 23822.8, 222923.15, 239483.2, 137940.69, 147064.2, 103680.76, 109896.67, 115797.77, 119380.33, 128996.94 ]
     }, {
     name: 'Consolidated cash reserves',
     data: [ 12040.09, 19057.94, 23822.8, 222923.15, 239483.2, 137940.69, 147064.2, 103680.76, 109896.67, 115797.77, 119380.33, 128996.94 ]
     } ]

     categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
     */

    let consolidatedCashReserves = this._dataService.getBankAccountsmetrixForSelectedDates(propertiesFilterdData);
    let CBB = propertiesFilterdData['CBB'] ? propertiesFilterdData['CBB'] : [];
    CBB = this._dataService.transformObjectToArray(CBB);
    let twoBL = propertiesFilterdData['2BL'] ? propertiesFilterdData['2BL'] : [];
    twoBL = this._dataService.transformObjectToArray(twoBL);

    let data = [ {
      name: '2BL',
      data: twoBL
    }, {
      name: 'CBB',
      data: CBB
    }, {
      name: 'Consolidated cash reserves',
      data: consolidatedCashReserves
    } ];

    return data;
  }


  public renderChart( propertiesFilterdData, xAxisDate ) {
    if (this.el.nativeElement && this._dataService.getCurrentTab()==='cash') {
      let data = this.calculateData(propertiesFilterdData);
      Highcharts.setOptions({
        lang: {
          thousandsSep: ',',
        }
      });
      Highcharts.chart('cash-reserves-chart-container', {
        chart: {
          type: 'column',
          backgroundColor: null

        },
        title: {
          text: 'Cash Reserves'
        },
        xAxis: {
          categories: xAxisDate
        },
        yAxis: {
          min: 0,
          stackLabels: {
            formatter: function () {
              return '$' + Highcharts.numberFormat(this.total, 0);
            },
            enabled: false,
            style: {
              fontWeight: 'bold',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
          },
          allowDecimals: false,
          title: {
            text: ''
          },
          labels: {
            formatter: function () {
              return '$' + Highcharts.numberFormat(this.value, 0);
            }
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y}</b> ({point.percentage:.0f}%)<br/>',
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
        }
        ,
        series: data
      });
    }


  }

}
