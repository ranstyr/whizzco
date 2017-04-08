import { Component, Output, EventEmitter, ViewChild } from '@angular/core';

import { SourcesChartComponent } from '../../../../theme/components/baCharts/sourcesChart/sourcesChart.component';
import { UsesChartComponent } from '../../../../theme/components/baCharts/usesChart/usesChart.component';
import { CashReservesChartComponent } from '../../../../theme/components/baCharts/cash-reserves-chart/cash-reserves-chart.component';
import { MortgageBalanceChartComponent } from '../../../../theme/components/baCharts/mortgage-balance-chart/mortgage-balance-chart.componenet';
import { InvestorLevelDistributionsChartComponent } from '../../../../theme/components/baCharts/investor-level-distributions-chart/investor-level-distributions-chart.component';

import { FilterService } from "../../filters.service";
import { BaPropertiesDataModel } from "../../../../theme/services/baModel/BaPropertiesDataModel";

import { PageDashboard } from "../page";

import 'style-loader!./cash.scss';

@Component({
  selector: 'cash-component',
  templateUrl: 'cash.html',

})

export class CashDashboard extends PageDashboard{

  @ViewChild(SourcesChartComponent) sourcesChartComponent: SourcesChartComponent;
  @ViewChild(UsesChartComponent) usesChartComponent: UsesChartComponent;
  @ViewChild(InvestorLevelDistributionsChartComponent) investorLevelDistributionsChartComponent: InvestorLevelDistributionsChartComponent;
  @ViewChild(CashReservesChartComponent) cashReservesChartComponent: CashReservesChartComponent;
  @ViewChild(MortgageBalanceChartComponent) mortgageBalanceChartComponent: MortgageBalanceChartComponent;

  constructor( private filtersService: FilterService, private baPropertiesDataModel: BaPropertiesDataModel ) {
    super(filtersService , baPropertiesDataModel);
  }

  ngAfterViewInit() {

    if (this.sourcesChartComponent) {
      this.sourcesChartComponent.renderChart(null);
    }
    if (this.usesChartComponent) {
      this.usesChartComponent.renderChart(null);
    }
    if (this.investorLevelDistributionsChartComponent) {
      this.investorLevelDistributionsChartComponent.renderChart(null);
    }
    if (this.cashReservesChartComponent) {
      this.cashReservesChartComponent.renderChart(null);
    }
    if (this.mortgageBalanceChartComponent) {
      this.mortgageBalanceChartComponent.renderChart(null);
    }

  }


}
