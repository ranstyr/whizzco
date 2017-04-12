/**
 * Created by ran.styr on 17/11/2016.
 */

import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { DataService } from "../../../../pages/dashboard/data.service";

declare let math;

@Component({
  selector: 'noi-net-income-chart',
  template: `
       <div #chart id="noiNetIncomeChartContainer" style="width:100%; height:50%;"></div>
       <ul>
    
  </ul> 
    `
})
export class NoiNetIncomeChartComponent {
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

  private calculateData( propertiesFilterdData , xAxisDate) {
    /*  series: [{
     name: 'NOI',
     data: [15599, 16009, 15628, 5890, 15618, 16068, 15033, 6705, 15646, 15876, 16387, 16214]
     }, {
     name: 'Net Income',
     data: [6608, 7018, 4333, -2807, 15618, 6520, 5484, -3428, 6098, 6327, 6839, 6666]
     }]

     categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
     */

    let revenue = this._dataService.getRevenuesMetricsForSelectedDates(propertiesFilterdData);
    revenue = this._dataService.transformObjectToArray(revenue);

    let operatingExpenses = this._dataService.getOperatingExpensesMetricsForSelectedDates(propertiesFilterdData);
    operatingExpenses = this._dataService.transformObjectToArray(operatingExpenses);

    let debtService = this._dataService.getDebtServiceMetricsForSelectedDates(propertiesFilterdData);
    debtService = this._dataService.transformObjectToArray(debtService);
    debtService = math.matrix(debtService);
    //the below line manage empty matrix

    debtService = (debtService._data &&  debtService._data.length > 0 ) ? math.matrix(debtService) : math.zeros(xAxisDate.length);

    let managementExpenses = this._dataService.getManagementExpensesMetricsForSelectedDates(propertiesFilterdData);
    managementExpenses = this._dataService.transformObjectToArray(managementExpenses);
    managementExpenses = math.matrix(managementExpenses);
    //the below line manage empty matrix

    managementExpenses = (managementExpenses._data &&  managementExpenses._data.length > 0 ) ? math.matrix(managementExpenses) : math.zeros(xAxisDate.length);

    let leaseTIM = this._dataService.getLeaseTIMetricsForSelectedDates(propertiesFilterdData);
    leaseTIM = this._dataService.transformObjectToArray(leaseTIM);
    leaseTIM = math.matrix(leaseTIM);
    //the below line manage empty matrix

    leaseTIM = (leaseTIM._data &&  leaseTIM._data.length > 0 ) ? math.matrix(leaseTIM) : math.zeros(xAxisDate.length);

    let CAPEX = this._dataService.getCAPEXMetricsForSelectedDates(propertiesFilterdData);
    CAPEX = this._dataService.transformObjectToArray(CAPEX);
    CAPEX = math.matrix(CAPEX);
    //the below line manage empty matrix

    CAPEX = (CAPEX._data &&  CAPEX._data.length > 0 ) ? math.matrix(CAPEX) : math.zeros(xAxisDate.length);

    revenue = (revenue) ? math.matrix(revenue) : math.zeros(xAxisDate.length);
    operatingExpenses = (operatingExpenses) ? math.matrix(operatingExpenses) : math.zeros(xAxisDate.length);

    let NOI = (revenue._data && operatingExpenses._data) ? math.subtract(revenue, operatingExpenses) : math.zeros(xAxisDate.length);

    let temptoSubtract = math.add(math.add(math.add(debtService, managementExpenses) ,  leaseTIM), CAPEX);

    let netCashIncome = (NOI._data&& temptoSubtract._data) ? math.subtract(NOI, temptoSubtract) : math.zeros(xAxisDate.length);

    return [ {
      name: 'NOI',
      data: NOI._data,
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.2f}</b>',
      }
    }, {
      name: 'Net Income',
      data: netCashIncome._data,
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y:.2f}</b>',
      }
    } ];

  }

  public renderChart( propertiesFilterdData, xAxisDate ) {
    if (this.el.nativeElement && this._dataService.getCurrentTab()==='financial') {
      let data = this.calculateData(propertiesFilterdData , xAxisDate);

      Highcharts.setOptions({
        lang: {
          thousandsSep: ',',

        }
      });
      Highcharts.chart('noiNetIncomeChartContainer', {
        chart: {
          type: 'column',
          backgroundColor: null
        },
        title: {
          text: 'NOI / Net Income'
        },
        xAxis: {
          categories: xAxisDate
        },
        credits: {
          enabled: false
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
