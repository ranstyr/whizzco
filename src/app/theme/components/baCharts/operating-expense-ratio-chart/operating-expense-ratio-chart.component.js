/**
 * Created by ran.styr on 17/11/2016.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angularfire2_1 = require("angularfire2");
var operatingExpenseRatioChartComponent = (function () {
    function operatingExpenseRatioChartComponent(_af) {
        this._af = _af;
    }
    operatingExpenseRatioChartComponent.prototype.renderChart = function (data) {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        Highcharts.chart('operating-expense-ratio-chart-container', {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Operating Expense Ratio'
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
                    name: 'Revenue',
                    type: 'column',
                    data: [17807, 17807, 17825, 17855, 17855, 17837, 17837, 17837, 17837, 17837, 17837, 17837],
                    tooltip: {
                        valuePrefix: '$'
                    }
                }, {
                    name: 'Operating expenses',
                    type: 'column',
                    data: [2208, 1798, 2197, 11966, 2237, 1769, 2804, 11131, 2191, 1961, 1449, 1623],
                    tooltip: {
                        valuePrefix: '$'
                    }
                }, {
                    name: 'Operating expenses ratio',
                    type: 'spline',
                    yAxis: 1,
                    data: [12, 10, 12, 67, 13, 10, 16, 62, 12, 11, 8, 9],
                    tooltip: {
                        valueSuffix: '%'
                    }
                }]
        });
    };
    return operatingExpenseRatioChartComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], operatingExpenseRatioChartComponent.prototype, "_data", void 0);
operatingExpenseRatioChartComponent = __decorate([
    core_1.Component({
        selector: 'operating-expense-ratio-chart',
        template: "\n       <div id=\"operating-expense-ratio-chart-container\" style=\"width:100%; height:50%;\"></div>\n       <ul>\n    \n  </ul> \n    "
    }),
    __metadata("design:paramtypes", [angularfire2_1.AngularFire])
], operatingExpenseRatioChartComponent);
exports.operatingExpenseRatioChartComponent = operatingExpenseRatioChartComponent;
//# sourceMappingURL=operating-expense-ratio-chart.component.js.map