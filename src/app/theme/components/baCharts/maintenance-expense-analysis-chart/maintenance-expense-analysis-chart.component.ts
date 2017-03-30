/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'maintenance-expense-analysis-chart',
  template: `
       <div id="maintenance-expense-analysis-chart-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class maintenanceExpenseAnalysisChartComponent {
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
    Highcharts.chart('maintenance-expense-analysis-chart-container', {
      chart: {
        type: 'column',
        backgroundColor: null

      },
      title: {
        text: 'Maintenance Expenses (per unit)'
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
        name: 'Janitorial Expense',
        data: [200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0]
      }, {
        name: 'Pest Control',
        data: [105, 105, 105, 105, 105, 0, 210, 105, 0, 210, 210, 0]
      }, {
        name: 'Painting',
        data: [0, 0, 0, 0, 45, 0, 0, 0, 0, 0, 0, 0]
      }, {
        name: 'Plumbing',
        data: [90, 0, 90, 0, 0, 180, 540, 0, 90, 0, 0, 0]
      }, {
        name: 'Roof Repair',
        data: [0, 0, 0, 0, 0, 0, 0, 3259.16, 0, 0, 0, 0]
      }, {
        name: 'General Repairs',
        data: [167.5, 0, 0, 0, 9.84, 0, 0, 0, 233.75, 55, 0, 0]
      }, {
        name: 'Supplies',
        data: [0, 0, 0, 0, 0, 185, 25, 26.06, 145, 14, 0, 0]
      }]
    });

  }

}
