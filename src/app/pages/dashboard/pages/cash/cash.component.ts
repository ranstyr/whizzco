import { Component, Output, EventEmitter, ViewChild } from '@angular/core';

import 'style-loader!./cash.scss';
import { sourcesChartComponent } from "../../../../theme/components/baCharts/sourcesChart/sourcesChart.component";
import { usesChartComponent } from "../../../../theme/components/baCharts/usesChart/usesChart.component";
import { cashReservesChartComponent } from "../../../../theme/components/baCharts/cash-reserves-chart/cash-reserves-chart.component";
import { mortgageBalanceChartComponent } from "../../../../theme/components/baCharts/mortgage-balance-chart/mortgage-balance-chart.componenet";
import { investorLevelDistributionsChartComponent } from "../../../../theme/components/baCharts/investor-level-distributions-chart/investor-level-distributions-chart.component";

@Component({
  selector: 'cash-component',
  templateUrl: 'cash.html',

})

export class CashDashboard {
  @ViewChild(sourcesChartComponent) sourcesChartComponent: sourcesChartComponent;
  @ViewChild(usesChartComponent) usesChartComponent: usesChartComponent;
  @ViewChild(investorLevelDistributionsChartComponent) investorLevelDistributionsChartComponent: investorLevelDistributionsChartComponent;
  @ViewChild(cashReservesChartComponent) cashReservesChartComponent: cashReservesChartComponent;
  @ViewChild(mortgageBalanceChartComponent) mortgageBalanceChartComponent: mortgageBalanceChartComponent;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if(this.sourcesChartComponent){
      this.sourcesChartComponent.renderChart(null);
    }
    if(this.usesChartComponent){
      this.usesChartComponent.renderChart(null);
    }
    if(this.investorLevelDistributionsChartComponent){
      this.investorLevelDistributionsChartComponent.renderChart(null);
    }
    if(this.cashReservesChartComponent){
      this.cashReservesChartComponent.renderChart(null);
    }
    if(this.mortgageBalanceChartComponent){
      this.mortgageBalanceChartComponent.renderChart(null);
    }

  }



}
