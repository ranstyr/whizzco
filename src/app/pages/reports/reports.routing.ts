import { Routes, RouterModule }  from '@angular/router';
import { Reports } from "./reports.component";
import { GenerateReport } from "./pages/generate/generate.component";
import { UploadReport } from "./pages/upload/upload.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Reports,
    children: [
      { path: 'generate', component: GenerateReport },
      { path: 'upload', component: UploadReport }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
