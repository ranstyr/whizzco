import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { ModalModule } from 'ng2-bootstrap';


import { routing }       from './reports.routing';
import { Reports } from './reports.component';
import { GenerateReport } from "./pages/generate/generate.component";
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
  ],
  declarations: [
    Reports,
    GenerateReport,

  ]
})
export class ReportsModule {
}
