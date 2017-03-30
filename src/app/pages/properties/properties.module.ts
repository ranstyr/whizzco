import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { routing }       from './properties.routing';
import { Properties } from './properties.component';
import { ListProperties } from "./pages/list/list.component";
import { ListService } from "./pages/list/list.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule
  ],
  declarations: [
    Properties,
    ListProperties
  ],
  providers: [
    ListService
  ]
})
export class PropertiesModule {
}
