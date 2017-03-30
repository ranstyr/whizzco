/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';



@Component({
  selector: 'T12-utility-expenses-chart-container',
  template: `
       <div #chart id="T12UtilityExpensesChartContainer" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class T12UtilityExpenseChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input() _data: Object;
  @ViewChild('chart') el: ElementRef;


  constructor(  ) {

  }

  public renderChart( data ) {
    if (this.el.nativeElement) {
      Highcharts.setOptions({
        lang: {
          thousandsSep: ','
        }
      });
      Highcharts.chart('T12UtilityExpensesChartContainer', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          backgroundColor: null

        },
        title: {
          text: 'T-12 Utility Expenses (per unit)'
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
        series: [{
          name: 'Brands',
          colorByPoint: true,
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
          },]
        }]
      });
    }


  }

}
