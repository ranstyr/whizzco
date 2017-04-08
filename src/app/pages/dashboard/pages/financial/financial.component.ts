import { Component, Output, EventEmitter, ViewChild } from '@angular/core';

import { IncomeAnaylsisChartComponent } from "../../../../theme/components/baCharts/income-anaylsis-chart/income-anaylsis-chart.component";
import { NoiNetIncomeChartComponent } from "../../../../theme/components/baCharts/noi-net-income-chart/noi-net-income-chart.component";
import { OperationalExpenseAnalysisChartComponent } from "../../../../theme/components/baCharts/operational-expense-analysis-chart/operational-expense-analysis-chart.component";
import { DebtServiceChartComponent } from "../../../../theme/components/baCharts/debt-service/debt-service-chart.component";

import { BaPropertiesDataModel } from "../../../../theme/services/baModel/BaPropertiesDataModel";
import { FilterService } from "../../filters.service";
import { FinancialService } from './financial.service';

import { PageDashboard } from "../page";


import 'style-loader!./financial.scss';

@Component({
  selector: 'financial-component',
  templateUrl: 'financial.html',
  providers: [FinancialService]

})

export class FinancialDashboard extends PageDashboard{


  @ViewChild(IncomeAnaylsisChartComponent) incomeAnaylsisChartComponent: IncomeAnaylsisChartComponent;
   @ViewChild(NoiNetIncomeChartComponent) noiNetIncomeChartComponent: NoiNetIncomeChartComponent;
   @ViewChild(OperationalExpenseAnalysisChartComponent) operationalExpenseAnalysisChartComponent: OperationalExpenseAnalysisChartComponent;
   @ViewChild(DebtServiceChartComponent) debtServiceChartComponent: DebtServiceChartComponent;

  constructor( private filtersService: FilterService, private baPropertiesDataModel: BaPropertiesDataModel ) {
    super(filtersService , baPropertiesDataModel);
  }


  ngAfterViewInit() {
    if(this.incomeAnaylsisChartComponent){
      this.incomeAnaylsisChartComponent.renderChart(null);
    }
    if(this.noiNetIncomeChartComponent){
      this.noiNetIncomeChartComponent.renderChart(null);
    }
    if(this.operationalExpenseAnalysisChartComponent){
      this.operationalExpenseAnalysisChartComponent.renderChart(null);
    }
    if(this.debtServiceChartComponent){
      this.debtServiceChartComponent.renderChart(null);
    }

  }



}
