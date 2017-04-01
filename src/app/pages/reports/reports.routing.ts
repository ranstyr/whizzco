import { Routes, RouterModule }  from '@angular/router';
import { Reports } from "./reports.component";
import { GenerateReport } from "./pages/generate/generate.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Reports,
    children: [
      { path: 'generate', component: GenerateReport }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
