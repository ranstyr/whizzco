/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'utility-expense-analysis-chart',
  template: `
       <div id="utility-expense-analysis-chart-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class utilityExpenseAnalysisChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input() _data: Object;


  constructor( ) {

  }

  public renderChart( data ) {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ',',
      }
    });
    Highcharts.chart('utility-expense-analysis-chart-container', {
      chart: {
        type: 'column',
        backgroundColor: null

      },
      title: {
        text: 'Utility Expenses (per unit)'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']      },
      yAxis: {
        min: 0,
        stackLabels: {
          formatter: function () {
            return '$' + Highcharts.numberFormat(this.total,0)
          },
          enabled: true,
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
          formatter: function() {
            return '$' + Highcharts.numberFormat(this.value, 0);
          }
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        }
      },
      series: [{
        name: 'Electricity',
        data: [11,10,11,11,11,11,11,11,10,12,10,11]
      }, {
        name: 'Water',
        data: [346,364,346,346,328,401,371,373,392,295,237,392]
      }, {
        name: 'Garbage and Recycling',
        data: [328,328,655,0,655,0,655,328,328,328,0,328]
      }]
    });

  }

}
