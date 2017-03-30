import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class KpiContainerService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'T-12 NOI',
        stats: '57,820',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'T-12 Net Income',
        stats: '89,745',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'T-12 DCR',
        stats: '178,391',
        icon: 'money',
      }
    ];
  }
}
