import { Routes, RouterModule }  from '@angular/router';

import { Properties } from './properties.component';
import { ListProperties } from "./pages/list/list.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Properties,
    children: [
      { path: 'properties', component: Properties }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
