import {Component} from '@angular/core';

import 'style-loader!./reports.scss';
import { BaPropertiesModel } from "../../theme/services/model/BaPropertiesModel";


@Component({
  selector: 'reports',
  templateUrl: './reports.html',
})
export class Reports {
  constructor(private _BaPropertiesModel : BaPropertiesModel) {

  }
}
