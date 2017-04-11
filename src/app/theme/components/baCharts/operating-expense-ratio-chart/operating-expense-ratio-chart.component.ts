/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { DataService } from "../../../../pages/dashboard/data.service";

declare let math;


@Component({
  selector: 'operating-expense-ratio-chart',
  template: `
       <div #chart id="operating-expense-ratio-chart-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class OperatingExpenseRatioChartComponent {
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

  private calculateData( propertiesFilterdData, xAxisDate ) {
    /*  series: [ {
     name: 'Revenue',
     type: 'column',
     data: [ 17807, 17807, 17825, 17855, 17855, 17837, 17837, 17837, 17837, 17837, 17837, 17837 ],
     tooltip: {
     valuePrefix: '$'
     }

     }, {
     name: 'Operating expenses',
     type: 'column',
     data: [ 2208, 1798, 2197, 11966, 2237, 1769, 2804, 11131, 2191, 1961, 1449, 1623 ],
     tooltip: {
     valuePrefix: '$'
     }

     }, {
     name: 'Operating expenses ratio',
     type: 'spline',
     yAxis: 1,
     data: [ 12, 10, 12, 67, 13, 10, 16, 62, 12, 11, 8, 9 ],
     tooltip: {
     valueSuffix: '%'
     }
     } ]
     */

    let revenue = this._dataService.getRevenuesMetricsForSelectedDates(propertiesFilterdData);
    revenue = this._dataService.transformObjectToArray(revenue);

    let operatingExpenses = this._dataService.getOperatingExpensesMetricsForSelectedDates(propertiesFilterdData);
    operatingExpenses = this._dataService.transformObjectToArray(operatingExpenses);

    let operatingExpensesRatio = (revenue && operatingExpenses) ?
      this._dataService.divideArrayElementsByArrayElements(revenue, operatingExpenses) : [];


    return [ {
      name: 'Revenue',
      type: 'column',
      data: revenue,
      tooltip: {
        valuePrefix: '$'
      }

    }, {
      name: 'Operating expenses',
      type: 'column',
      data: operatingExpenses,
      tooltip: {
        valuePrefix: '$'
      }

    }, {
      name: 'Operating expenses ratio',
      type: 'spline',
      yAxis: 1,
      data: operatingExpensesRatio,
      tooltip: {
        valueSuffix: '%'
      }
    } ];

  }


  public renderChart( propertiesFilterdData, xAxisDate ) {
    if (this.el.nativeElement && this._dataService.getCurrentTab()==='operation') {
      let data = this.calculateData(propertiesFilterdData, xAxisDate);
      Highcharts.setOptions({
        lang: {
          thousandsSep: ',',

        }
      });
      Highcharts.chart('operating-expense-ratio-chart-container', {
        chart: {
          zoomType: 'xy',
          backgroundColor: null

        },
        title: {
          text: 'Operating Expense Ratio'
        },
        subtitle: {
          text: ''
        },
        xAxis: [ {
          categories: xAxisDate,
          crosshair: true
        } ],
        yAxis: [ { // Primary yAxis
          labels: {
            format: '${value}',
            style: {
              color: Highcharts.getOptions().colors[ 1 ]
            }
          },
          title: {
            text: '',
            style: {
              color: Highcharts.getOptions().colors[ 1 ]
            }
          }
        }, { // Secondary yAxis
          title: {
            text: '',
            style: {
              color: Highcharts.getOptions().colors[ 0 ]
            }
          },
          labels: {
            format: '{value}',
            style: {
              color: Highcharts.getOptions().colors[ 0 ]
            }
          },
          opposite: true
        } ],
        tooltip: {
          shared: true
        },
        navigation: {
          buttonOptions: {
            theme: {
              fill: "#5B8DB5",
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
        series: data
      });
    }
  }

}
