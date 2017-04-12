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

  private calculateData( propertiesFilterdData ) {
    /*  series: [ {
     name: 'Landlord Expenses',
     data: [ 70, 0, 0, 2510, 91, 0, 0, 2038, 0, 55.15, 0, 0 ]
     }, {
     name: 'Maintenance',
     data: [ 563, 205, 295, 205, 260, 465, 875, 3490, 569, 379, 310, 0 ]
     }, {
     name: 'Utilities',
     data: [ 685, 702, 1012, 357, 993, 412, 1037, 711, 730, 635, 247, 731 ]
     }, {
     name: 'Property Management Fees',
     data: [ 685, 702, 1012, 357, 993, 412, 1037, 711, 730, 635, 247, 731 ]
     } ]

     categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
     */

    let landlordExpenses = this._dataService.getLandlordExpensesMetricsForSelectedDates(propertiesFilterdData);
    landlordExpenses = this._dataService.transformObjectToArray(landlordExpenses);

    let maintenance = this._dataService.getMaintenanceMetricsForSelectedDates(propertiesFilterdData);
    maintenance = this._dataService.transformObjectToArray(maintenance);

    let utilities = this._dataService.getUtilitiesMetricsForSelectedDates(propertiesFilterdData);
    utilities = this._dataService.transformObjectToArray(utilities);

    let propertyManagementFees = propertiesFilterdData[ 'Property Management Fees' ] ? propertiesFilterdData[ 'Property Management Fees' ] : [];
    propertyManagementFees = this._dataService.transformObjectToArray(propertyManagementFees);


    let data = [ {
      name: 'Landlord Expenses',
      data: landlordExpenses
    }, {
      name: 'Maintenance',
      data: maintenance
    }, {
      name: 'Utilities',
      data: utilities
    }, {
      name: 'Property Management Fees',
      data: propertyManagementFees
    } ];

    return data;
  }

  public renderChart( propertiesFilterdData, xAxisDate ) {
    if (this.el.nativeElement && this._dataService.getCurrentTab()==='financial') {
      let data = this.calculateData(propertiesFilterdData);

      Highcharts.setOptions({
        lang: {
          thousandsSep: ',',

        }
      });
      Highcharts.chart('operational-expense-analysis-chart-container', {
        chart: {
          type: 'column',
          backgroundColor: null
        },
        title: {
          text: 'Operational Expense Analysis'
        },
        yAxis: {
          min: 0,
          stackLabels: {
            formatter: function () {
              return '$' + Highcharts.numberFormat(this.total, 0);
            },
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
          },
          allowDecimals: false,
          title: {
            text: ''
          },
          labels: {
            formatter: function () {
              return '$' + Highcharts.numberFormat(this.value, 0);
            }
          }
        },
        xAxis: {
          categories: xAxisDate
        },
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.2f}</b> ({point.percentage:.0f}%)<br/>',
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
        plotOptions: {
          column: {
            stacking: 'normal',
          }
        },
        series: data
        /*      series: [{
         name: 'Acquestion fee',
         data:  data.AcquisitionFee
         }, {
         name: 'Asset Mangment',
         data: data.AssetManagement
         }, {
         name: 'Property Mangment',
         data: data.PropertyManagement
         },
         {
         name: 'Promote',
         data: data.Promote
         }]*/
      });
    }

  }

}
