import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

//highcharts

import { NoiNetIncomeChartComponent }   from './noi-net-income-chart/noi-net-income-chart.component';
import { IncomeAnaylsisChartComponent } from './income-anaylsis-chart/income-anaylsis-chart.component';
import { OperatingExpenseRatioChartComponent } from './operating-expense-ratio-chart/operating-expense-ratio-chart.component';
import { OperationalExpenseAnalysisChartComponent } from './operational-expense-analysis-chart/operational-expense-analysis-chart.component';
import { CashReservesChartComponent } from './cash-reserves-chart/cash-reserves-chart.component';
import { InvestorLevelDistributionsChartComponent } from './investor-level-distributions-chart/investor-level-distributions-chart.component';
import { MaintenanceExpensesPerSqft } from './maintenance-expense-per-sqft-chart/maintenance-expense-per-sqft-chart.component';
import { MortgageBalanceChartComponent } from './mortgage-balance-chart/mortgage-balance-chart.componenet';
import { SourcesChartComponent } from './sourcesChart/sourcesChart.component';
import { UtilityExpensesPerUnitComponent } from './utility-expenses-per-unit-chart/utility-expenses-per-unit';
import { MaintenanceExpensesPerUnit } from './maintenance-expense-per-unit-chart/maintenance-expense-per-unit.component';
import { UsesChartComponent } from './usesChart/usesChart.component';
import { DebtServiceChartComponent } from './debt-service/debt-service-chart.component';
import { UtilityExpensesPerSqftComponent } from './utility-expenses-per-sqft-chart/utility-expenses-per-sqft';


@NgModule({
  imports: [],
  exports: [
    NoiNetIncomeChartComponent,
    IncomeAnaylsisChartComponent,
    OperatingExpenseRatioChartComponent,
    OperationalExpenseAnalysisChartComponent,
    CashReservesChartComponent,
    UtilityExpensesPerSqftComponent,
    UsesChartComponent,
    MaintenanceExpensesPerUnit,
    UtilityExpensesPerUnitComponent,
    SourcesChartComponent,
    MortgageBalanceChartComponent,
    MaintenanceExpensesPerSqft,
    InvestorLevelDistributionsChartComponent,
    DebtServiceChartComponent,

  ],
  declarations: [
    NoiNetIncomeChartComponent,
    IncomeAnaylsisChartComponent,
    OperatingExpenseRatioChartComponent,
    OperationalExpenseAnalysisChartComponent,
    CashReservesChartComponent,
    UtilityExpensesPerSqftComponent,
    UsesChartComponent,
    MaintenanceExpensesPerUnit,
    UtilityExpensesPerUnitComponent,
    SourcesChartComponent,
    MortgageBalanceChartComponent,
    MaintenanceExpensesPerSqft,
    InvestorLevelDistributionsChartComponent,
    DebtServiceChartComponent
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class ChartsModule {
}
