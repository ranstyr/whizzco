/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { DataService } from "../../../../pages/dashboard/data.service";

declare let math;

@Component({
  selector: 'investor-level-distributions-chart',
  template: `
       <div #chart id="investor-level-distributions-chart-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class InvestorLevelDistributionsChartComponent {
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

  private calculateData( propertiesFilterdData ) {
    /*  series: [ {
     name: 'Distributions',
     type: 'column',
     data: [ 12178, 0, 0, 50651, 0, 107355, 0, 33740, 0, 0, 0, 0 ],
     tooltip: {
     valuePrefix: '$'
     }

     }, {
     name: 'Accummulated ditsributions',
     type: 'column',
     data: [ 12178, 12178, 12178, 62830, 62830, 170184, 170184, 203924, 203924, 203924, 203924, 203924 ],
     tooltip: {
     valuePrefix: '$'
     }

     }, {
     name: 'CoC',
     type: 'spline',
     yAxis: 1,
     data: [ 1, 1, 1, 5, 5, 14, 14, 17, 17, 17, 17, 17 ],
     tooltip: {
     valueSuffix: '%'
     }
     } ]

     categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
     */

    let consolidatedCashReserves = this._dataService.getAccumulatedDistributionsmetrixForSelectedDates(propertiesFilterdData);
    consolidatedCashReserves = this._dataService.transformObjectToArray(consolidatedCashReserves);

    let distributions = propertiesFilterdData[ 'Distributions' ] ? propertiesFilterdData[ 'Distributions' ] : [];
    distributions = this._dataService.transformObjectToArray(distributions);


    let data = [ {
      name: 'Distributions',
      type: 'column',
      data: distributions,
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.2f}</b><br>',
      }

    }, {
      name: 'Accummulated ditsributions',
      type: 'column',
      data: consolidatedCashReserves,
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.2f}</b><br>',
      }

    }, {
      name: 'CoC',
      type: 'spline',
      yAxis: 1,
      data: [ 1, 1, 1, 5, 5, 14, 14, 17, 17, 17, 17, 17 ],
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.2f}%</b><br>',
      }
    } ];

    return data;
  }

  public renderChart( propertiesFilterdData, xAxisDate ) {
    if (this.el.nativeElement && this._dataService.getCurrentTab()==='cash') {
      let data = this.calculateData(propertiesFilterdData);
      Highcharts.setOptions({
        lang: {
          thousandsSep: ','
        }
      });
      Highcharts.chart('investor-level-distributions-chart-container', {
        chart: {
          zoomType: 'xy',
          backgroundColor: null

        },
        title: {
          text: 'Investor Level Distributions'
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
        series: data
      });
    }


  }

}
