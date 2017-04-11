import { Component, Output, EventEmitter, ViewChild } from '@angular/core';

import { SourcesChartComponent } from '../../../../theme/components/baCharts/sourcesChart/sourcesChart.component';
import { UsesChartComponent } from '../../../../theme/components/baCharts/usesChart/usesChart.component';
import { CashReservesChartComponent } from '../../../../theme/components/baCharts/cash-reserves-chart/cash-reserves-chart.component';
import { MortgageBalanceChartComponent } from '../../../../theme/components/baCharts/mortgage-balance-chart/mortgage-balance-chart.componenet';
import { InvestorLevelDistributionsChartComponent } from '../../../../theme/components/baCharts/investor-level-distributions-chart/investor-level-distributions-chart.component';

import { FilterService } from "../../filters.service";
import { BaPropertiesDataModel } from "../../../../theme/services/baModel/BaPropertiesDataModel";

import { PageDashboard } from "../page";

import * as _ from 'lodash';


import 'style-loader!./cash.scss';
import { DataService } from "../../data.service";
import { BaPropertiesModel } from "../../../../theme/services/baModel/BaPropertiesModel";

@Component({
  selector: 'cash-component',
  templateUrl: 'cash.html',

})

export class CashDashboard extends PageDashboard {

  character: string;
  dataUpdated: EventEmitter<any> = new EventEmitter();

  @ViewChild(SourcesChartComponent) sourcesChartComponent: SourcesChartComponent;
  @ViewChild(UsesChartComponent) usesChartComponent: UsesChartComponent;
  @ViewChild(InvestorLevelDistributionsChartComponent) investorLevelDistributionsChartComponent: InvestorLevelDistributionsChartComponent;
  @ViewChild(CashReservesChartComponent) cashReservesChartComponent: CashReservesChartComponent;
  @ViewChild(MortgageBalanceChartComponent) mortgageBalanceChartComponent: MortgageBalanceChartComponent;

  constructor( private filtersService: FilterService,
               private baPropertiesDataModel: BaPropertiesDataModel,
               private _dataCashService: DataService,
               private _BaPropertiesCashModel: BaPropertiesModel ) {
    super(filtersService, baPropertiesDataModel , _dataCashService , _BaPropertiesCashModel);
  }

  ngAfterViewInit() {
    this._dataCashService.setCurrentTab('cash');

    let propertiesFilterdData = this.filtersService.getPropertiesFilterdData();
    let xAxisDate = this.filtersService.getXAxisDate();
    if (!(_.isEmpty(propertiesFilterdData) && _.isEmpty(xAxisDate))) {
      if (this.sourcesChartComponent) {
        this.sourcesChartComponent.renderChart(propertiesFilterdData, xAxisDate);
      }
      if (this.usesChartComponent) {
        this.usesChartComponent.renderChart(propertiesFilterdData, xAxisDate);
      }
      if (this.investorLevelDistributionsChartComponent) {
        this.investorLevelDistributionsChartComponent.renderChart(propertiesFilterdData, xAxisDate);
      }
      if (this.cashReservesChartComponent) {
        this.cashReservesChartComponent.renderChart(propertiesFilterdData, xAxisDate);
      }
      if (this.mortgageBalanceChartComponent) {
        this.mortgageBalanceChartComponent.renderChart(propertiesFilterdData, xAxisDate);
      }
    }
    else{
      if (this.sourcesChartComponent) {
        this.sourcesChartComponent.renderChart([], []);
      }
      if (this.usesChartComponent) {
        this.usesChartComponent.renderChart([], []);
      }
      if (this.investorLevelDistributionsChartComponent) {
        this.investorLevelDistributionsChartComponent.renderChart([], []);
      }
      if (this.cashReservesChartComponent) {
        this.cashReservesChartComponent.renderChart([], []);
      }
      if (this.mortgageBalanceChartComponent) {
        this.mortgageBalanceChartComponent.renderChart([], []);
      }
    }
  }


}
