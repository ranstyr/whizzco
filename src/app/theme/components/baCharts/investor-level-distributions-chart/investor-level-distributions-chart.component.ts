/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'investor-level-distributions-chart',
  template: `
       <div id="investor-level-distributions-chart-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class investorLevelDistributionsChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input() _data: Object;


  constructor(  ) {

  }

  public renderChart( data ) {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });
    Highcharts.chart('investor-level-distributions-chart-container', {
      chart: {
        zoomType: 'xy',
        backgroundColor: null

      },
      title: {
        text: 'Investor Level Distributions'
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
      series: [{
        name: 'Distributions',
        type: 'column',
        data: [12178,0,0,50651,0,107355,0,33740,0,0,0,0],
        tooltip: {
          valuePrefix: '$'
        }

      }, {
        name: 'Accummulated ditsributions',
        type: 'column',
        data: [12178,12178,12178,62830,62830,170184,170184,203924,203924,203924,203924,203924],
        tooltip: {
          valuePrefix: '$'
        }

      }, {
        name: 'CoC',
        type: 'spline',
        yAxis: 1,
        data: [1,1,1,5,5,14,14,17,17,17,17,17],
        tooltip: {
          valueSuffix: '%'
        }
      }]
    });

  }

}
