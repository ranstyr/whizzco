/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, Output } from '@angular/core';



@Component({
  selector: 'operational-expense-analysis-chart',
  template: `
       <div id="operational-expense-analysis-chart-container" style="width:95%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class operationalExpenseAnalysisChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Output() updateOperationalExpenseAnalysisChart: Function = this.renderChart;


  constructor(  ) {

  }

  public renderChart( data ) {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ',',

      }
    });
    Highcharts.chart('operational-expense-analysis-chart-container', {
      chart: {
        type: 'column',
        backgroundColor: null
      },
      title: {
        text: 'Operational Expense Analysis'
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
      series: [{
        name: 'Taxes & Insurance',
        data: [70, 0, 0, 2510, 91, 0, 0, 2038, 0, 55.15, 0, 0]
      }, {
        name: 'Maintenance',
        data: [563, 205, 295, 205, 260, 465, 875, 3490, 569, 379, 310, 0]
      }, {
        name: 'Utilities',
        data: [685, 702, 1012, 357, 993, 412, 1037, 711, 730, 635, 247, 731]
      }]
/*      series: [{
        name: 'Acquestion fee',
        data:  data.AcquisitionFee
      }, {
        name: 'Asset Mangment',
        data: data.AssetManagement
      }, {
        name: 'Property Mangment',
        data: data.PropertyManagement
      },
        {
          name: 'Promote',
          data: data.Promote
        }]*/
    });

  }

}
