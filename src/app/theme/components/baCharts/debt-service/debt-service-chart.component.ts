/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { DataService } from "../../../../pages/dashboard/data.service";

declare let math;

@Component({
  selector: 'debt-service-chart',
  template: `
       <div #chart id="debt-service-chart-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class DebtServiceChartComponent {
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

     categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
     */

    let interestPayments = (propertiesFilterdData[ 'Interest Payments' ]);
    interestPayments = this._dataService.transformObjectToArray(interestPayments);

    let amortization = (propertiesFilterdData[ 'Amortization' ]);
    amortization = this._dataService.transformObjectToArray(amortization);

    let revenue = this._dataService.getRevenuesMetricsForSelectedDates(propertiesFilterdData);
    revenue = this._dataService.transformObjectToArray(revenue);
    revenue = math.matrix(revenue);
    //the below line manage empty matrix
    revenue = (revenue._data &&  revenue._data.length > 0 ) ? math.matrix(revenue) : math.zeros(xAxisDate.length);

    let operatingExpenses = this._dataService.getOperatingExpensesMetricsForSelectedDates(propertiesFilterdData);
    operatingExpenses = this._dataService.transformObjectToArray(operatingExpenses);
    operatingExpenses = math.matrix(operatingExpenses);
    //the below line manage empty matrix
    operatingExpenses = (operatingExpenses._data &&  operatingExpenses._data.length > 0 ) ? math.matrix(operatingExpenses) : math.zeros(xAxisDate.length);

    let NOI = (revenue && operatingExpenses) ? math.add(revenue, operatingExpenses) : math.zeros(xAxisDate.length);

    let debtService = this._dataService.getDebtServiceMetricsForSelectedDates(propertiesFilterdData);
    debtService = this._dataService.transformObjectToArray(debtService);


    let DCR = (NOI && NOI._data && Object.prototype.toString.call( NOI._data ) === '[object Array]'&&
               debtService && NOI._data.length > 0 && debtService.length ) ?
      this._dataService.divideArrayElementsByArrayElements(NOI._data, debtService) : [];


    return [ {
      name: 'Interest Payments',
      type: 'column',
      data: interestPayments,
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.2f}</b> ({point.percentage:.0f}%)<br/>',
      }

    }, {
      name: 'Amortization',
      type: 'column',
      data: amortization,
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.2f}</b> ({point.percentage:.0f}%)<br/>',
      }

    }, {
      name: 'DCR',
      type: 'spline',
      yAxis: 1,
      data: DCR,
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.2f}</b> ({point.percentage:.0f}%)<br/>',
      }
    } ];

  }

  public renderChart( propertiesFilterdData, xAxisDate ) {
    if (this.el.nativeElement && this._dataService.getCurrentTab()==='financial') {
      let data = this.calculateData(propertiesFilterdData, xAxisDate);
      Highcharts.setOptions({
        lang: {
          thousandsSep: ',',

        }
      });
      Highcharts.chart('debt-service-chart-container', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          backgroundColor: null

        },
        title: {
          text: 'Browser market shares'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
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
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: [{
            name: 'Microsoft Internet Explorer',
            y: 56.33
          }, {
            name: 'Chrome',
            y: 24.03,
            sliced: true,
            selected: true
          }, {
            name: 'Firefox',
            y: 10.38
          }, {
            name: 'Safari',
            y: 4.77
          }, {
            name: 'Opera',
            y: 0.91
          }, {
            name: 'Proprietary or Undetectable',
            y: 0.2
          }]
        }]
      });
    }


  }

}
