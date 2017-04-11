import { Component, Output, EventEmitter, ViewChild } from '@angular/core';

import { IncomeAnaylsisChartComponent } from "../../../../theme/components/baCharts/income-anaylsis-chart/income-anaylsis-chart.component";
import { NoiNetIncomeChartComponent } from "../../../../theme/components/baCharts/noi-net-income-chart/noi-net-income-chart.component";
import { OperationalExpenseAnalysisChartComponent } from "../../../../theme/components/baCharts/operational-expense-analysis-chart/operational-expense-analysis-chart.component";
import { DebtServiceChartComponent } from "../../../../theme/components/baCharts/debt-service/debt-service-chart.component";

import { BaPropertiesDataModel } from "../../../../theme/services/baModel/BaPropertiesDataModel";
import { FilterService } from "../../filters.service";
import { FinancialService } from './financial.service';

import { PageDashboard } from "../page";

import * as _ from 'lodash';


import 'style-loader!./financial.scss';
import { DataService } from "../../data.service";
import { BaPropertiesModel } from "../../../../theme/services/baModel/BaPropertiesModel";

@Component({
  selector: 'financial-component',
  templateUrl: 'financial.html',
  providers: [ FinancialService ]

})

export class FinancialDashboard extends PageDashboard {


  @ViewChild(IncomeAnaylsisChartComponent) incomeAnaylsisChartComponent: IncomeAnaylsisChartComponent;
  @ViewChild(NoiNetIncomeChartComponent) noiNetIncomeChartComponent: NoiNetIncomeChartComponent;
  @ViewChild(OperationalExpenseAnalysisChartComponent) operationalExpenseAnalysisChartComponent: OperationalExpenseAnalysisChartComponent;
  @ViewChild(DebtServiceChartComponent) debtServiceChartComponent: DebtServiceChartComponent;

  constructor( private filtersService: FilterService,
               private baPropertiesDataModel: BaPropertiesDataModel,
               private _dataFinancialService: DataService,
               private _BaPropertiesFinancialModel: BaPropertiesModel ) {
    super(filtersService, baPropertiesDataModel,_dataFinancialService , _BaPropertiesFinancialModel);
  }


  ngAfterViewInit() {
    this._dataFinancialService.setCurrentTab('financial');

    let propertiesFilterdData = this.filtersService.getPropertiesFilterdData();
    let xAxisDate = this.filtersService.getXAxisDate();
    if (!(_.isEmpty(propertiesFilterdData) && _.isEmpty(xAxisDate))) {
        if (this.incomeAnaylsisChartComponent) {
          this.incomeAnaylsisChartComponent.renderChart(propertiesFilterdData, xAxisDate);
        }
        if (this.noiNetIncomeChartComponent) {
          this.noiNetIncomeChartComponent.renderChart(propertiesFilterdData, xAxisDate);
        }
        if (this.operationalExpenseAnalysisChartComponent) {
          this.operationalExpenseAnalysisChartComponent.renderChart(propertiesFilterdData, xAxisDate);
        }
        if (this.debtServiceChartComponent) {
          this.debtServiceChartComponent.renderChart(propertiesFilterdData, xAxisDate);
        }
      }else{
      if (this.incomeAnaylsisChartComponent) {
        this.incomeAnaylsisChartComponent.renderChart([], []);
      }
      if (this.noiNetIncomeChartComponent) {
        this.noiNetIncomeChartComponent.renderChart([], []);
      }
      if (this.operationalExpenseAnalysisChartComponent) {
        this.operationalExpenseAnalysisChartComponent.renderChart([], []);
      }
      if (this.debtServiceChartComponent) {
        this.debtServiceChartComponent.renderChart([], []);
      }
    }
  }
}
