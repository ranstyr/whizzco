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
        description: 'Impressions',
        stats: '10,987',
      }, {
        color: pieColor,
        description: 'Clicks',
        stats: '1,236',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'T-12 DCR',
        stats: '11.2%',
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
