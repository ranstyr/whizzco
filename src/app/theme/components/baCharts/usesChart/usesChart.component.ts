/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';



@Component({
  selector: 'uses-chart',
  template: `
       <div #chart id="usesChartContainer" style="width:100%; height:100%;"></div>
       <ul>
    
  </ul> 
    `
})
export class usesChartComponent {
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
      Highcharts.chart('usesChartContainer', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          backgroundColor: null

        },
        title: {
          align: 'center',
          text: 'T-12 Cash Uses'
        },
        tooltip: {
          pointFormat: '<b>${point.y}</b> Share: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
              style: {
                fontWeight: 'bold',
                color: '#0F1A36'
              }
            },
            showInLegend: true
          }
        },
        series: [{
          innerSize: '80%',
          name: 'Uses',
          colorByPoint: true,
          data: [{
            name: 'Distributions',
            y: 203924
          }, {
            name: 'Consolidated Cash Reserves',
            y: 129997,
            sliced: true,
            selected: true
          }]
        }]
      });
    }


  }

}
