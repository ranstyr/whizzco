/**
 * Created by ran.styr on 17/11/2016.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angularfire2_1 = require("angularfire2");
var utilityExpenseAnalysisChartComponent = (function () {
    function utilityExpenseAnalysisChartComponent(_af) {
        this._af = _af;
    }
    utilityExpenseAnalysisChartComponent.prototype.renderChart = function (data) {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ',',
            }
        });
        Highcharts.chart('utility-expense-analysis-chart-container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Utility Expenses (per unit)'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                min: 0,
                stackLabels: {
                    formatter: function () {
                        return '$' + Highcharts.numberFormat(this.total, 0);
                    },
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                },
                allowDecimals: false,
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return '$' + Highcharts.numberFormat(this.value, 0);
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>${point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                }
            },
            series: [{
                    name: 'Electricity',
                    data: [11, 10, 11, 11, 11, 11, 11, 11, 10, 12, 10, 11]
                }, {
                    name: 'Water',
                    data: [346, 364, 346, 346, 328, 401, 371, 373, 392, 295, 237, 392]
                }, {
                    name: 'Garbage and Recycling',
                    data: [328, 328, 655, 0, 655, 0, 655, 328, 328, 328, 0, 328]
                }]
        });
    };
    return utilityExpenseAnalysisChartComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], utilityExpenseAnalysisChartComponent.prototype, "_data", void 0);
utilityExpenseAnalysisChartComponent = __decorate([
    core_1.Component({
        selector: 'utility-expense-analysis-chart',
        template: "\n       <div id=\"utility-expense-analysis-chart-container\" style=\"width:100%; height:50%;\"></div>\n       <ul>\n    \n  </ul> \n    "
    }),
    __metadata("design:paramtypes", [angularfire2_1.AngularFire])
], utilityExpenseAnalysisChartComponent);
exports.utilityExpenseAnalysisChartComponent = utilityExpenseAnalysisChartComponent;
//# sourceMappingURL=utility-expense-analysis-chart.component.js.map