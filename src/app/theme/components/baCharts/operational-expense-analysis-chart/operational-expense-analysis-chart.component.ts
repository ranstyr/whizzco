/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DataService } from "../../../../pages/dashboard/data.service";


@Component({
  selector: 'operational-expense-analysis-chart',
  template: `
       <div #chart id="operational-expense-analysis-chart-container" style="width:95%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class OperationalExpenseAnalysisChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input('dataUpdated') dataUpdated: EventEmitter<any>;
  @ViewChild('chart') el: ElementRef;

  constructor( private _dataService: DataService ) {

  }

  ngAfterViewInit() {
    this.dataUpdated.subscribe(
      ( res ) => {
        if (res.data.propertiesFilterdData) {
          this.renderChart(res.data.propertiesFilterdData, res.data.xAxisDate);
        }
      });
  }


  public renderChart( propertiesFilterdData, xAxisDate ) {

    Highcharts.setOptions({
      lang: {
        thousandsSep: ',',

      }
    });
    Highcharts.chart('operational-expense-analysis-chart-container', {
      chart: {
        type: 'line',
        backgroundColor: null
      },
      title: {
        text: 'Average KPI'
      },
      subtitle: {},
      xAxis: {
        categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
      },
      yAxis: {
        title: {
          text: 'Average'
        }
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + ':</b> ' + this.y + '<br/>' +
            Highcharts.dateFormat('%B %e, %Y', this.x);
        }
      },

      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [ {
        name: 'Clicks',
        color: 'black',
        data: [ 7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6 ]
      }, {
        name: 'Impressions',
        color: '#4366A6',
        data: [ 3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8 ]
      } ]
    });
  }


}
