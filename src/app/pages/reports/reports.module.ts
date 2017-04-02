import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { ModalModule , TooltipModule } from 'ng2-bootstrap';


import { routing }       from './reports.routing';
import { Reports } from './reports.component';
import { GenerateReport } from "./pages/generate/generate.component";
import { UploadReport } from "./pages/upload/upload.component";
import { UploadService } from "./pages/upload/upload.service";


import { SelectModule } from 'angular2-select';
import { Daterangepicker } from 'ng2-daterangepicker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,
    SelectModule,
    Daterangepicker,
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    Reports,
    GenerateReport,
    UploadReport
  ],
  providers: [
    UploadService
  ]

})
export class ReportsModule {
}
