import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { FinancialService } from './financial.service';

import 'style-loader!./financial.scss';
import { IncomeAnaylsisChartComponent } from "../../../../theme/components/baCharts/income-anaylsis-chart/income-anaylsis-chart.component";
import { noiNetIncomeChartComponent } from "../../../../theme/components/baCharts/noi-net-income-chart/noi-net-income-chart.component";
import { operationalExpenseAnalysisChartComponent } from "../../../../theme/components/baCharts/operational-expense-analysis-chart/operational-expense-analysis-chart.component";
import { operatingExpenseRatioChartComponent } from "../../../../theme/components/baCharts/operating-expense-ratio-chart/operating-expense-ratio-chart.component";

@Component({
  selector: 'financial-component',
  templateUrl: 'financial.html',
  providers: [FinancialService]

})

export class FinancialDashboard {
   @ViewChild(IncomeAnaylsisChartComponent) IncomeAnaylsisChartComponent: IncomeAnaylsisChartComponent;
   @ViewChild(noiNetIncomeChartComponent) noiNetIncomeChartComponent: noiNetIncomeChartComponent;
   @ViewChild(operationalExpenseAnalysisChartComponent) operationalExpenseAnalysisChartComponent: operationalExpenseAnalysisChartComponent;
  @ViewChild(operatingExpenseRatioChartComponent) operatingExpenseRatioChartComponent: operatingExpenseRatioChartComponent;

  constructor(private financialService : FinancialService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if(this.IncomeAnaylsisChartComponent){
      this.IncomeAnaylsisChartComponent.renderChart(null);
    }
    if(this.noiNetIncomeChartComponent){
      this.noiNetIncomeChartComponent.renderChart(null);
    }
    if(this.operationalExpenseAnalysisChartComponent){
      this.operationalExpenseAnalysisChartComponent.renderChart(null);
    }
    if(this.operatingExpenseRatioChartComponent){
      this.operatingExpenseRatioChartComponent.renderChart(null);
    }

  }



}
