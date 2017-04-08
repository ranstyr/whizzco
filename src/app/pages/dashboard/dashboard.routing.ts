import { Routes, RouterModule }  from '@angular/router';

import { Dashboard } from './dashboard.component';
import { ModuleWithProviders } from '@angular/core';

import { FinancialDashboard } from './pages/financial';
import { OperationDashboard } from "./pages/operation/operation.component";
import { CashDashboard } from "./pages/cash/cash.component";




// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      { path: '', component: FinancialDashboard },
      { path: 'financial', component: FinancialDashboard },
      { path: 'operation', component: OperationDashboard },
      { path: 'cash', component: CashDashboard }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
