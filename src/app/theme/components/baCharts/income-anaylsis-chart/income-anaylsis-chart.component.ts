/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'income-anaylsis-chart',
  template: `
       <div #chart id="incomeAnaylsisChartContainer" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class IncomeAnaylsisChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input() _data: Object;
  @ViewChild('chart') el: ElementRef;


  constructor(  ) {

  }



  public renderChart( data ) {
    if (this.el && this.el.nativeElement) {
      Highcharts.setOptions({
        lang: {
          thousandsSep: ','
        }
      });
      Highcharts.chart('incomeAnaylsisChartContainer', {
        chart: {
          type: 'column',
          backgroundColor: null

        },
        title: {
          text: 'Income Analysis'
        },
        xAxis: {
          categories: [ 'Jan-16', 'Feb-16', 'Mar-16', 'Apr-16', 'May-16', 'Jun-16', 'Jul-16', 'Aug-16', 'Sep-16', 'Oct-16', 'Nov-16', 'Dec-16' ]
        },
        yAxis: {
          min: 16000 /*Math.max.apply(null, data._EffectiveRent) * 0.8*/,
          tickInterval: 10000,
          stackLabels: {
            formatter: function () {
              return Highcharts.numberFormat(this.total, 2);
            },
            enabled: false,
            style: {
              fontWeight: 'bold',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
          },
          title: {
            text: ''
          }
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: $<b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true
        },
        plotOptions: {
          column: {
            stacking: 'normal',
          }
        },
        series: [{
          name: 'CAM',
          data: [189, 189, 189, 189, 189, 189, 189, 189, 189, 189, 189, 189]
        }, {
          name: 'Other',
          data: [0, 0, 19, 19, 19, 0, 0, 0, 0, 0, 0, 0]
        }, {
          name: 'Commercial Rental',
          data: [2900, 2900, 2900, 2900, 2900, 2900, 2900, 2900, 2900, 2900, 2900, 2900]
        }, {
          name: 'Residential Rental',
          data: [14718, 14718, 14718, 14748, 14748, 14748, 14748, 14748, 14748, 14748, 14748, 14748]
        }]
/*
        series: [
          {
            name: 'Loss To Lease',
            data: data._LossToLease
          }, {
            name: 'Vacancy Loss',
            data: data._VacancyLoss
          },
          {
            name: 'Rent Concession',
            data: data._RentConcession
          }, {
            name: 'Collection Loss',
            data: data._CollectionLoss
          }, {
            name: 'Effective Rent',
            data: data._EffectiveRent
          } ]
*/
      });


    }
  }
}
