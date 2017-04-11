import { Component, ViewChild } from '@angular/core';

import { MaintenanceExpensesPerUnit } from "../../../../theme/components/baCharts/maintenance-expense-per-unit-chart/maintenance-expense-per-unit.component";
import { UtilityExpensesPerUnitComponent } from "../../../../theme/components/baCharts/utility-expenses-per-unit-chart/utility-expenses-per-unit";
import { MaintenanceExpensesPerSqft } from "../../../../theme/components/baCharts/maintenance-expense-per-sqft-chart/maintenance-expense-per-sqft-chart.component";
import { UtilityExpensesPerSqftComponent } from "../../../../theme/components/baCharts/utility-expenses-per-sqft-chart/utility-expenses-per-sqft";
import { OperatingExpenseRatioChartComponent } from "../../../../theme/components/baCharts/operating-expense-ratio-chart/operating-expense-ratio-chart.component";

import { BaPropertiesDataModel } from "../../../../theme/services/baModel/BaPropertiesDataModel";
import { FilterService } from "../../filters.service";

import { PageDashboard } from "../page";

import * as _ from 'lodash';


import 'style-loader!./operation.scss';
import { DataService } from "../../data.service";
import { BaPropertiesModel } from "../../../../theme/services/baModel/BaPropertiesModel";
import { FirebaseObjectObservable } from "angularfire2";

@Component({
  selector: 'operation-component',
  templateUrl: 'operation.html',

})

export class OperationDashboard extends PageDashboard {
  _propertiesData : Object;

  @ViewChild(MaintenanceExpensesPerUnit) maintenanceExpensesPerUnit: MaintenanceExpensesPerUnit;
  @ViewChild(UtilityExpensesPerUnitComponent) utilityExpensesPerUnitComponent: UtilityExpensesPerUnitComponent;
  @ViewChild(MaintenanceExpensesPerSqft) maintenanceExpensesPerSqft: MaintenanceExpensesPerSqft;
  @ViewChild(UtilityExpensesPerSqftComponent) utilityExpensesPerSqftComponent: UtilityExpensesPerSqftComponent;
  @ViewChild(OperatingExpenseRatioChartComponent) operatingExpenseRatioChartComponent: OperatingExpenseRatioChartComponent;

  constructor( private filtersService: FilterService, private _baPropertiesDataModel: BaPropertiesDataModel,
               private _dataService: DataService, private _BaPropertiesModel: BaPropertiesModel ) {
    super(filtersService, _baPropertiesDataModel);
  }

  ngOnInit() {


    // properties data

    this._BaPropertiesModel.getDataObservable()
      .subscribe(( value: any ) => {
        if (value.$exists()) {
          let propertiesTemp = this._BaPropertiesModel.getData(value);
          this._propertiesData = propertiesTemp.map(( a ) => {
            return a.PropertyName;
          });
        }
      });

  }


  ngAfterViewInit() {
    this._dataService.setCurrentTab('operation');

    let propertiesFilterdData = this.filtersService.getPropertiesFilterdData();
    let xAxisDate = this.filtersService.getXAxisDate();
    if (!(_.isEmpty(propertiesFilterdData) && _.isEmpty(xAxisDate))) {
      if (this.maintenanceExpensesPerUnit) {
        this.maintenanceExpensesPerUnit.renderChart(propertiesFilterdData, xAxisDate);
      }
      if (this.utilityExpensesPerUnitComponent) {
        this.utilityExpensesPerUnitComponent.renderChart(propertiesFilterdData, xAxisDate);
      }
      if (this.maintenanceExpensesPerSqft) {
        this.maintenanceExpensesPerSqft.renderChart(propertiesFilterdData, xAxisDate);
      }
      if (this.utilityExpensesPerSqftComponent) {
        this.utilityExpensesPerSqftComponent.renderChart(propertiesFilterdData, xAxisDate);
      }
      if (this.operatingExpenseRatioChartComponent) {
        this.operatingExpenseRatioChartComponent.renderChart(propertiesFilterdData, xAxisDate);
      }
    } else {
      //render empty chart
      if (this.maintenanceExpensesPerUnit) {
        this.maintenanceExpensesPerUnit.renderChart([], []);
      }
      if (this.utilityExpensesPerUnitComponent) {
        this.utilityExpensesPerUnitComponent.renderChart([], []);
      }
      if (this.maintenanceExpensesPerSqft) {
        this.maintenanceExpensesPerSqft.renderChart([], []);
      }
      if (this.utilityExpensesPerSqftComponent) {
        this.utilityExpensesPerSqftComponent.renderChart([], []);
      }
      if (this.operatingExpenseRatioChartComponent) {
        this.operatingExpenseRatioChartComponent.renderChart([], []);
      }
    }
  }

}
