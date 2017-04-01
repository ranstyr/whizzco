/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cash-reserves-chart',
  template: `
       <div id="cash-reserves-chart-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class cashReservesChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input() _data: Object;


  constructor() {

  }

  public renderChart( data ) {
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
        categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
      },
      yAxis: {
        min: 0,
        stackLabels: {
          formatter: function () {
            return '$' + Highcharts.numberFormat(this.total, 0)
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
      series: [ {
        name: '2BL',
        data: [ 13759.78, 13770.81, 13343.72, 7518.75, 13330.22, 13748.75, 7101.22, 13316.22, 13028.87, 7291.22, 16788.75, 1000 ]
      }, {
        name: 'CBB',
        data: [ 12040.09, 19057.94, 23822.8, 222923.15, 239483.2, 137940.69, 147064.2, 103680.76, 109896.67, 115797.77, 119380.33, 128996.94 ]
      } ]
    })
    ;

  }

}
