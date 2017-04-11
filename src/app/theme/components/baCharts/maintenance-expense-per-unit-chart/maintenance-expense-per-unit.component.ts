/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { DataService } from "../../../../pages/dashboard/data.service";

declare let math;

@Component({
  selector: 'maintenance-expense-per-unit',
  template: `
       <div #chart id="maintenance-expense-per-unit-container" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class MaintenanceExpensesPerUnit {
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
     type: 'pie',
     name: 'Expense amount',
     innerSize: '80%',
     data: [ {
     name: 'Janitorial',
     y: 1200
     }, {
     name: 'Pest Control',
     y: 1260,
     sliced: true,
     selected: true
     }, {
     name: 'Painting',
     y: 45
     }, {
     name: 'Plumbing',
     y: 990
     }, {
     name: 'Roof Repair',
     y: 3260
     }, {
     name: 'General Repairs',
     y: 466
     }, {
     name: 'Supplies',
     y: 395
     } ]
     } ]

     categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
     */

    let janitorial = this._dataService.getJanitorialMetrixForSelectedDates(propertiesFilterdData);
    janitorial = this._dataService.objectValeuSum(janitorial);

    let pestControl = this._dataService.getPestControlmetrixForSelectedDates(propertiesFilterdData);
    pestControl = this._dataService.objectValeuSum(pestControl);

    let painting = this._dataService.getPaintingMetrixForSelectedDates(propertiesFilterdData);
    painting = this._dataService.objectValeuSum(painting);

    let plumbing = this._dataService.getPlumbingMetrixForSelectedDates(propertiesFilterdData);
    plumbing = this._dataService.objectValeuSum(plumbing);

    let roofRepair = this._dataService.getRoofRepairMetrixForSelectedDates(propertiesFilterdData);
    roofRepair = this._dataService.objectValeuSum(roofRepair);

    let generalRepairs = this._dataService.getGeneralRepairsMetrixForSelectedDates(propertiesFilterdData);
    generalRepairs = this._dataService.objectValeuSum(generalRepairs);

    let supplies = this._dataService.getSuppliesMetrixForSelectedDates(propertiesFilterdData);
    supplies = this._dataService.objectValeuSum(supplies);


    return [ {
      name: 'Janitorial',
      y: janitorial
    }, {
      name: 'Pest Control',
      y: pestControl,
      sliced: true,
      selected: true
    }, {
      name: 'Painting',
      y: painting
    }, {
      name: 'Plumbing',
      y: plumbing
    }, {
      name: 'Roof Repair',
      y: roofRepair
    }, {
      name: 'General Repairs',
      y: generalRepairs
    }, {
      name: 'Supplies',
      y: supplies
    } ];
  }

  public renderChart( propertiesFilterdData, xAxisDate ) {
    if (this.el.nativeElement && this._dataService.getCurrentTab()==='operation') {
      let data = this.calculateData(propertiesFilterdData, xAxisDate);

      Highcharts.setOptions({
        lang: {
          thousandsSep: ','
        }
      });
      Highcharts.chart('maintenance-expense-per-unit-container', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          backgroundColor: null

        },
        title: {
          text: 'Maintenance Expenses Per Unit',
          align: 'center',
        },
        tooltip: {
          pointFormat: '<b>${point.y}</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            showInLegend: true,
            dataLabels: {
              enabled: false,
              style: {
                fontWeight: 'bold',
                color: '#0F1A36'
              }
            },
          }
        },
        navigation: {
          buttonOptions: {
            theme: {
              fill: "#6095bf",
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
        series: [ {
          type: 'pie',
          name: 'Expense amount',
          innerSize: '80%',
          data: data
        } ]
      });
    }
  }

}
