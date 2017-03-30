import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

//highcharts

import { noiNetIncomeChartComponent }   from './noi-net-income-chart/noi-net-income-chart.component'
import { IncomeAnaylsisChartComponent } from './income-anaylsis-chart/income-anaylsis-chart.component'
import { operatingExpenseRatioChartComponent } from './operating-expense-ratio-chart/operating-expense-ratio-chart.component'
import { operationalExpenseAnalysisChartComponent } from './operational-expense-analysis-chart/operational-expense-analysis-chart.component'
import { cashReservesChartComponent } from './cash-reserves-chart/cash-reserves-chart.component'
import { investorLevelDistributionsChartComponent } from './investor-level-distributions-chart/investor-level-distributions-chart.component'
import { maintenanceExpenseAnalysisChartComponent } from './maintenance-expense-analysis-chart/maintenance-expense-analysis-chart.component'
import { mortgageBalanceChartComponent } from './mortgage-balance-chart/mortgage-balance-chart.componenet'
import { sourcesChartComponent } from './sourcesChart/sourcesChart.component'
import { T12UtilityExpenseChartComponent } from './T12-utility-expenses-chart/T12UtilityExpensesChart.component'
import { T12MaintenanceExpensesChartComponent } from './T12-maintenance-expenses-chart/T12MaintenanceExpensesChart.component'
import { usesChartComponent } from './usesChart/usesChart.component'
import { utilityExpenseAnalysisChartComponent } from './utility-expense-analysis-chart/utility-expense-analysis-chart.component'


@NgModule({
  imports: [],
  exports: [
    noiNetIncomeChartComponent,
    IncomeAnaylsisChartComponent,
    operatingExpenseRatioChartComponent,
    operationalExpenseAnalysisChartComponent,
    cashReservesChartComponent,
    utilityExpenseAnalysisChartComponent,
    usesChartComponent,
    T12MaintenanceExpensesChartComponent,
    T12UtilityExpenseChartComponent,
    sourcesChartComponent,
    mortgageBalanceChartComponent,
    maintenanceExpenseAnalysisChartComponent,
    investorLevelDistributionsChartComponent,

  ],
  declarations: [
    noiNetIncomeChartComponent,
    IncomeAnaylsisChartComponent,
    operatingExpenseRatioChartComponent,
    operationalExpenseAnalysisChartComponent,
    cashReservesChartComponent,
    utilityExpenseAnalysisChartComponent,
    usesChartComponent,
    T12MaintenanceExpensesChartComponent,
    T12UtilityExpenseChartComponent,
    sourcesChartComponent,
    mortgageBalanceChartComponent,
    maintenanceExpenseAnalysisChartComponent,
    investorLevelDistributionsChartComponent,
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class chartsModule {
}
