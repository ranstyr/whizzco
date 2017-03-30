import { Component, Output, EventEmitter, ViewChild } from '@angular/core';

import 'style-loader!./operation.scss';
import { T12MaintenanceExpensesChartComponent } from "../../../../theme/components/baCharts/T12-maintenance-expenses-chart/T12MaintenanceExpensesChart.component";
import { T12UtilityExpenseChartComponent } from "../../../../theme/components/baCharts/T12-utility-expenses-chart/T12UtilityExpensesChart.component";
import { maintenanceExpenseAnalysisChartComponent } from "../../../../theme/components/baCharts/maintenance-expense-analysis-chart/maintenance-expense-analysis-chart.component";
import { utilityExpenseAnalysisChartComponent } from "../../../../theme/components/baCharts/utility-expense-analysis-chart/utility-expense-analysis-chart.component";

@Component({
  selector: 'operation-component',
  templateUrl: 'operation.html',

})

export class OperationDashboard {
  @ViewChild(T12MaintenanceExpensesChartComponent) T12MaintenanceExpensesChartComponent: T12MaintenanceExpensesChartComponent;
  @ViewChild(T12UtilityExpenseChartComponent) T12UtilityExpenseChartComponent: T12UtilityExpenseChartComponent;
  @ViewChild(maintenanceExpenseAnalysisChartComponent) maintenanceExpenseAnalysisChartComponent: maintenanceExpenseAnalysisChartComponent;
  @ViewChild(utilityExpenseAnalysisChartComponent) utilityExpenseAnalysisChartComponent: utilityExpenseAnalysisChartComponent;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if(this.T12MaintenanceExpensesChartComponent){
      this.T12MaintenanceExpensesChartComponent.renderChart(null);
    }
    if(this.T12UtilityExpenseChartComponent){
      this.T12UtilityExpenseChartComponent.renderChart(null);
    }
    if(this.maintenanceExpenseAnalysisChartComponent){
      this.maintenanceExpenseAnalysisChartComponent.renderChart(null);
    }
    if(this.utilityExpenseAnalysisChartComponent){
      this.utilityExpenseAnalysisChartComponent.renderChart(null);
    }

  }



}
