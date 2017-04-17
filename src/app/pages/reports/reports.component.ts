import {Component} from '@angular/core';

import { BaThemeSpinner } from "../../theme/services/baThemeSpinner/baThemeSpinner.service";

import 'style-loader!./reports.scss';


@Component({
  selector: 'reports',
  templateUrl: './reports.html',
})
export class Reports {
  constructor(private _spinner: BaThemeSpinner) {

  }

  ngOnInit() {
    this._spinner.hide();
  }
}
