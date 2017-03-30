/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'noi-net-income-chart',
  template: `
       <div #chart id="noiNetIncomeChartContainer" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class noiNetIncomeChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input() _data: Object;
  @ViewChild('chart') el:ElementRef;


  constructor(  ) {

  }

  public renderChart(data) {
    if (this.el.nativeElement){
      Highcharts.setOptions({
        lang: {
          thousandsSep: ',',

        }
      });
      Highcharts.chart('noiNetIncomeChartContainer', {
        chart: {
          type: 'column',
          backgroundColor: null
        },
        title: {
          text: 'NOI / Net Income'
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'NOI',
          data: [15599, 16009, 15628, 5890, 15618, 16068, 15033, 6705, 15646, 15876, 16387, 16214]
        }, {
          name: 'Net Income',
          data: [6608, 7018, 4333, -2807, 15618, 6520, 5484, -3428, 6098, 6327, 6839, 6666]
        }]
      });    }

  }

}
