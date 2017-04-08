import { Component, ViewChild } from '@angular/core';

import { MaintenanceExpensesPerUnit } from "../../../../theme/components/baCharts/maintenance-expense-per-unit-chart/maintenance-expense-per-unit.component";
import { UtilityExpensesPerUnitComponent } from "../../../../theme/components/baCharts/utility-expenses-per-unit-chart/utility-expenses-per-unit";
import { MaintenanceExpensesPerSqft } from "../../../../theme/components/baCharts/maintenance-expense-per-sqft-chart/maintenance-expense-per-sqft-chart.component";
import { UtilityExpensesPerSqftComponent } from "../../../../theme/components/baCharts/utility-expenses-per-sqft-chart/utility-expenses-per-sqft";
import { OperatingExpenseRatioChartComponent } from "../../../../theme/components/baCharts/operating-expense-ratio-chart/operating-expense-ratio-chart.component";

import { BaPropertiesDataModel } from "../../../../theme/services/baModel/BaPropertiesDataModel";
import { FilterService } from "../../filters.service";

import { PageDashboard } from "../page";

import 'style-loader!./operation.scss';

@Component({
  selector: 'operation-component',
  templateUrl: 'operation.html',

})

export class OperationDashboard extends PageDashboard {
  filters : Object;


  @ViewChild(MaintenanceExpensesPerUnit) maintenanceExpensesPerUnit: MaintenanceExpensesPerUnit;
  @ViewChild(UtilityExpensesPerUnitComponent) utilityExpensesPerUnitComponent: UtilityExpensesPerUnitComponent;
  @ViewChild(MaintenanceExpensesPerSqft) maintenanceExpensesPerSqft: MaintenanceExpensesPerSqft;
  @ViewChild(UtilityExpensesPerSqftComponent) utilityExpensesPerSqftComponent: UtilityExpensesPerSqftComponent;
  @ViewChild(OperatingExpenseRatioChartComponent) operatingExpenseRatioChartComponent: OperatingExpenseRatioChartComponent;

  constructor( private filtersService: FilterService, private baPropertiesDataModel: BaPropertiesDataModel ) {
    super(filtersService , baPropertiesDataModel);
  }

  ngAfterViewInit() {
    if(this.maintenanceExpensesPerUnit){
      this.maintenanceExpensesPerUnit.renderChart(null);
    }
    if(this.utilityExpensesPerUnitComponent){
      this.utilityExpensesPerUnitComponent.renderChart(null);
    }
    if(this.maintenanceExpensesPerSqft){
      this.maintenanceExpensesPerSqft.renderChart(null);
    }
    if(this.utilityExpensesPerSqftComponent){
      this.utilityExpensesPerSqftComponent.renderChart(null);
    }
    if(this.operatingExpenseRatioChartComponent){
      this.operatingExpenseRatioChartComponent.renderChart(null);
    }

  }



}
