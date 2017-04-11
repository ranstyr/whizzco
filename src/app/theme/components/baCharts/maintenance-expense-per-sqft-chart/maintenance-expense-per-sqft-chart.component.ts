/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { DataService } from "../../../../pages/dashboard/data.service";


@Component({
  selector: 'maintenance-expense-per-sqft',
  template: `
       <div #chart id="maintenance-expense-per-sqft-chart-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class MaintenanceExpensesPerSqft {
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
     name: 'Janitorial Expense',
     data: [ 200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0 ]
     }, {
     name: 'Pest Control',
     data: [ 105, 105, 105, 105, 105, 0, 210, 105, 0, 210, 210, 0 ]
     }, {
     name: 'Painting',
     data: [ 0, 0, 0, 0, 45, 0, 0, 0, 0, 0, 0, 0 ]
     }, {
     name: 'Plumbing',
     data: [ 90, 0, 90, 0, 0, 180, 540, 0, 90, 0, 0, 0 ]
     }, {
     name: 'Roof Repair',
     data: [ 0, 0, 0, 0, 0, 0, 0, 3259.16, 0, 0, 0, 0 ]
     }, {
     name: 'General Repairs',
     data: [ 167.5, 0, 0, 0, 9.84, 0, 0, 0, 233.75, 55, 0, 0 ]
     }, {
     name: 'Supplies',
     data: [ 0, 0, 0, 0, 0, 185, 25, 26.06, 145, 14, 0, 0 ]
     } ]
     */

    let janitorial = this._dataService.getJanitorialMetrixForSelectedDates(propertiesFilterdData);
    janitorial = this._dataService.transformObjectToArray(janitorial);

    let pestControl = this._dataService.getPestControlmetrixForSelectedDates(propertiesFilterdData);
    pestControl = this._dataService.transformObjectToArray(pestControl);

    let painting = this._dataService.getPaintingMetrixForSelectedDates(propertiesFilterdData);
    painting = this._dataService.transformObjectToArray(painting);

    let plumbing = this._dataService.getPlumbingMetrixForSelectedDates(propertiesFilterdData);
    plumbing = this._dataService.transformObjectToArray(plumbing);

    let roofRepair = this._dataService.getRoofRepairMetrixForSelectedDates(propertiesFilterdData);
    roofRepair = this._dataService.transformObjectToArray(roofRepair);

    let generalRepairs = this._dataService.getGeneralRepairsMetrixForSelectedDates(propertiesFilterdData);
    generalRepairs = this._dataService.transformObjectToArray(generalRepairs);

    let supplies = this._dataService.getSuppliesMetrixForSelectedDates(propertiesFilterdData);
    supplies = this._dataService.transformObjectToArray(supplies);


    return [ {
      name: 'Janitorial Expense',
      data: janitorial
    }, {
      name: 'Pest Control',
      data: pestControl
    }, {
      name: 'Painting',
      data: painting
    }, {
      name: 'Plumbing',
      data: plumbing
    }, {
      name: 'Roof Repair',
      data: roofRepair
    }, {
      name: 'General Repairs',
      data: generalRepairs
    }, {
      name: 'Supplies',
      data: supplies
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
      Highcharts.chart('maintenance-expense-per-sqft-chart-container', {
        chart: {
          type: 'column',
          backgroundColor: null

        },
        title: {
          text: 'Maintenance Expenses Per Sqft'
        },
        xAxis: {
          categories: xAxisDate
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
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y}</b> ({point.percentage:.0f}%)<br/>',
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
      });
    }
  }

}
