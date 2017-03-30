/**
 * Created by ran.styr on 17/11/2016.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angularfire2_1 = require("angularfire2");
var investorLevelDistributionsChartComponent = (function () {
    function investorLevelDistributionsChartComponent(_af) {
        this._af = _af;
    }
    investorLevelDistributionsChartComponent.prototype.renderChart = function (data) {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        Highcharts.chart('investor-level-distributions-chart-container', {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Investor Level Distributions'
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    crosshair: true
                }],
            yAxis: [{
                    labels: {
                        format: '${value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }, {
                    title: {
                        text: '',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }],
            tooltip: {
                shared: true
            },
            series: [{
                    name: 'Distributions',
                    type: 'column',
                    data: [12178, 0, 0, 50651, 0, 107355, 0, 33740, 0, 0, 0, 0],
                    tooltip: {
                        valuePrefix: '$'
                    }
                }, {
                    name: 'Accummulated ditsributions',
                    type: 'column',
                    data: [12178, 12178, 12178, 62830, 62830, 170184, 170184, 203924, 203924, 203924, 203924, 203924],
                    tooltip: {
                        valuePrefix: '$'
                    }
                }, {
                    name: 'CoC',
                    type: 'spline',
                    yAxis: 1,
                    data: [1, 1, 1, 5, 5, 14, 14, 17, 17, 17, 17, 17],
                    tooltip: {
                        valueSuffix: '%'
                    }
                }]
        });
    };
    return investorLevelDistributionsChartComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], investorLevelDistributionsChartComponent.prototype, "_data", void 0);
investorLevelDistributionsChartComponent = __decorate([
    core_1.Component({
        selector: 'investor-level-distributions-chart',
        template: "\n       <div id=\"investor-level-distributions-chart-container\" style=\"width:100%; height:50%;\"></div>\n       <ul>\n    \n  </ul> \n    "
    }),
    __metadata("design:paramtypes", [angularfire2_1.AngularFire])
], investorLevelDistributionsChartComponent);
exports.investorLevelDistributionsChartComponent = investorLevelDistributionsChartComponent;
//# sourceMappingURL=investor-level-distributions-chart.component.js.map