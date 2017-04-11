/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { DataService } from "../../../../pages/dashboard/data.service";



@Component({
  selector: 'uses-chart',
  template: `
       <div #chart id="usesChartContainer" style="width:100%; height:100%;"></div>
       <ul>
    
  </ul> 
    `
})
export class UsesChartComponent {
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
    let consolidatedCashReserves = this._dataService.getSumBankAccountsMetrics(propertiesFilterdData);
    let accumulatedDistributions = this._dataService.getSumAccumulatedDistributionsMetrics(propertiesFilterdData);

    let data = [ {
      name: 'Consolidated cash reserves',
      y: consolidatedCashReserves
    }, {
      name: 'Distributions',
      y: accumulatedDistributions
    } ];

    return data;

  }

  public renderChart( propertiesFilterdData, xAxisDate  ) {
    if (this.el.nativeElement && this._dataService.getCurrentTab()==='cash') {
      let data = this.calculateData(propertiesFilterdData);

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
          text: 'Cash Uses'
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
          innerSize: '80%',
          name: 'Uses',
          colorByPoint: true,
          data: data
        }]
      });
    }


  }

}
