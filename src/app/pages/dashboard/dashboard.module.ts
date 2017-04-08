import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';


import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { FinancialDashboard } from './pages/financial'
import { OperationDashboard } from './pages/operation'
import { CashDashboard } from './pages/cash'



import { PopularApp } from './popularApp';
import { kpiContainer } from './kpi-conainer';
import { TrafficChart } from './trafficChart';
import { UsersMap } from './usersMap';
import { LineChart } from './lineChart';
import { Feed } from './feed';
import { Todo } from './todo';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { FeedService } from './feed/feed.service';
import { LineChartService } from './lineChart/lineChart.service';
import { KpiContainerService } from './kpi-conainer/kpi-container.service';
import { TodoService } from './todo/todo.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { UsersMapService } from './usersMap/usersMap.service';
import { FilterService } from "./filters.service";

import { SelectModule } from 'angular2-select';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    SelectModule,
    Daterangepicker
  ],
  declarations: [
    PopularApp,
    kpiContainer,
    TrafficChart,
    UsersMap,
    LineChart,
    Feed,
    Todo,
    Calendar,
    Dashboard,
    FinancialDashboard,
    OperationDashboard,
    CashDashboard
  ],
  providers: [
    CalendarService,
    FeedService,
    LineChartService,
    KpiContainerService,
    TodoService,
    TrafficChartService,
    UsersMapService,
    FilterService
  ]
})
export class DashboardModule {}
