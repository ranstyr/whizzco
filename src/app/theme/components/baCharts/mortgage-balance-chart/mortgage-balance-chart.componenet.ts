import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { AngularFire } from 'angularfire2';


@Component({
  selector: 'mortgage-balance-chart',
  template: `
       <div id="mortgage-balance-chart-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class mortgageBalanceChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input() _data: Object;
  @ViewChild('chart') el: ElementRef;


  constructor( ) {

  }

  public renderChart( data ) {
      Highcharts.setOptions({
        lang: {
          thousandsSep: ',',

        }
      });
      Highcharts.chart('mortgage-balance-chart-container', {
        chart: {
          type: 'column',
          backgroundColor: null
        },
        title: {
          text: 'Mortgage Balance'
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          labels: {
            format: '${value}'
          },
          min: 0,
          title: '',
          stackLabels: {
            enabled: false,
            style: {
              fontWeight: 'bold',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
          }
        },
        legend: {
          align: 'center',
          x: 10,
          verticalAlign: 'bottom',
          y: 0,
          floating: false,
          backgroundColor: null,
          shadow: false
        },
        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
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
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: false,
              color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
          }
        },
        series: [{
          name: 'Mortgage',
          data: [1725609.71, 1723018.73, 1720418.16, 2000000, 2000000, 1997118.22, 1994228.57, 1991328.96, 1988419.69, 1985501.06, 1982572.39, 1979643.72]
        }]
      });
    }
}
