/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';



@Component({
  selector: 'T12-maintenance-expenses-chart-container',
  template: `
       <div #chart id="T12MaintenanceExpensesChartContainer" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class T12MaintenanceExpensesChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input() _data: Object;
  @ViewChild('chart') el: ElementRef;


  constructor( ) {

  }

  public renderChart( data ) {
    if (this.el.nativeElement) {
      Highcharts.setOptions({
        lang: {
          thousandsSep: ','
        }
      });
      Highcharts.chart('T12MaintenanceExpensesChartContainer', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          backgroundColor: null

        },
        title: {
          text: 'T-12 Maintenance Expenses (per unit)',
          align: 'center',
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
        series: [ {
          type: 'pie',
          name: 'Expense amount',
          innerSize: '80%',
          data: [ {
            name: 'Janitorial',
            y: 1200
          }, {
            name: 'Pest Control',
            y: 1260,
            sliced: true,
            selected: true
          }, {
            name: 'Painting',
            y: 45
          }, {
            name: 'Plumbing',
            y: 990
          }, {
            name: 'Roof Repair',
            y: 3260
          }, {
            name: 'General Repairs',
            y: 466
          }, {
            name: 'Supplies',
            y: 395
          } ]
        } ]
      });
    }


  }

}
