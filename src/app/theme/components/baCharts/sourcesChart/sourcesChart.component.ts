/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';



@Component({
  selector: 'sources-chart',
  template: `
       <div #chart id="sourcesChartContainer" style="width:100%;height:100%;"></div>
       <ul>
    
  </ul> 
    `
})
export class sourcesChartComponent {
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
      Highcharts.chart('sourcesChartContainer', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          backgroundColor: null

        },
        title: {
          align: 'center',
          text: 'T-12 Cash Sources'
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
        series: [ {
          innerSize: '80%',
          name: 'Source',
          colorByPoint: true,
          data: [{
            name: 'Property net income',
            y: 44275
          }, {
            name: 'Cash reserve',
            y: 12040,
            sliced: true,
            selected: true
          }, {
            name: 'Refinancing',
            y: 277370
          }]
        } ]
      });
    }


  }

}
