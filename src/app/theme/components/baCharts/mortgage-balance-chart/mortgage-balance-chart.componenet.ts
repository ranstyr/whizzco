import { Component, Input, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { DataService } from "../../../../pages/dashboard/data.service";


@Component({
  selector: 'mortgage-balance-chart',
  template: `
       <div #chart id="mortgage-balance-chart-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class MortgageBalanceChartComponent {
  options: Highcharts.ChartOptions;
  _modelRef: any;

  @Input('dataUpdated') dataUpdated: EventEmitter<any>;
  @ViewChild('chart') el: ElementRef;


  constructor(private _dataService: DataService ) {

  }


  ngAfterViewInit() {
    this.dataUpdated.subscribe(
      ( res ) => {
        if (res.data.propertiesFilterdData) {
          this.renderChart(res.data.propertiesFilterdData, res.data.xAxisDate);
        }
      });
  }

  private calculateData( propertiesFilterdData ) {
    /*series: [{
     name: 'Mortgage',
     data: [1725609.71, 1723018.73, 1720418.16, 2000000, 2000000, 1997118.22, 1994228.57, 1991328.96, 1988419.69, 1985501.06, 1982572.39, 1979643.72]
     }]
     });

     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
     */
    if (propertiesFilterdData && Object.keys(propertiesFilterdData).length < 1) {
      return [];
    }
    let arr = [];
    for (let key in propertiesFilterdData) {
      if (propertiesFilterdData.hasOwnProperty(key)){
        arr.push(propertiesFilterdData[ key ]);
      }
    }


    return [ {
      name: 'Mortgage',
      data: arr
    } ];

  }

  public renderChart( propertiesFilterdData, xAxisDate ) {
    if (this.el.nativeElement && this._dataService.getCurrentTab()==='cash') {
      let data = this.calculateData(propertiesFilterdData[ 'Mortgage 1' ]);
      Highcharts.setOptions({
        lang: {
          thousandsSep: ',',

        }
      });
      Highcharts.chart('mortgage-balance-chart-container', {
        chart: {
          type: 'column',
          backgroundColor: null
        },
        title: {
          text: 'Mortgage Balance'
        },
        xAxis: {
          categories: xAxisDate
        },
        yAxis: {
          labels: {
            format: '${value}'
          },
          min: 0,
          title: '',
          stackLabels: {
            enabled: false,
            style: {
              fontWeight: 'bold',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
          }
        },
        legend: {
          align: 'center',
          x: 10,
          verticalAlign: 'bottom',
          y: 0,
          floating: false,
          backgroundColor: null,
          shadow: false
        },
        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y:.2f}<br/>Total: {point.stackTotal}'
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
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: false,
              color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
          }
        },
        series: data
      });
    }
  }
}
