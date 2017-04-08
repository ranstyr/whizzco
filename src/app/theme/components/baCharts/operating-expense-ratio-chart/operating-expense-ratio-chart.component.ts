/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'operating-expense-ratio-chart',
  template: `
       <div id="operating-expense-ratio-chart-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class OperatingExpenseRatioChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input() _data: Object;


  constructor(  ) {

  }

  public renderChart( data ) {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ',',

      }
    });
    Highcharts.chart('operating-expense-ratio-chart-container', {
      chart: {
        zoomType: 'xy',
        backgroundColor: null

      },
      title: {
        text: 'Operating Expense Ratio'
      },
      subtitle: {
        text: ''
      },
      xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '${value}',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        title: {
          text: '',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        }
      }, { // Secondary yAxis
        title: {
          text: '',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
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
        name: 'Revenue',
        type: 'column',
        data: [17807,17807,17825,17855,17855,17837,17837,17837,17837,17837,17837,17837],
        tooltip: {
          valuePrefix: '$'
        }

      }, {
        name: 'Operating expenses',
        type: 'column',
        data: [2208,1798,2197,11966,2237,1769,2804,11131,2191,1961,1449,1623],
        tooltip: {
          valuePrefix: '$'
        }

      }, {
        name: 'Operating expenses ratio',
        type: 'spline',
        yAxis: 1,
        data: [12,10,12,67,13,10,16,62,12,11,8,9],
        tooltip: {
          valueSuffix: '%'
        }
      }]
    });

  }

}
