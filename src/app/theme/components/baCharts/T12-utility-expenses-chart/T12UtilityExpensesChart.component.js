/**
 * Created by ran.styr on 17/11/2016.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angularfire2_1 = require("angularfire2");
var T12UtilityExpenseChartComponent = (function () {
    function T12UtilityExpenseChartComponent(_af) {
        this._af = _af;
    }
    T12UtilityExpenseChartComponent.prototype.renderChart = function (data) {
        if (this.el.nativeElement) {
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });
            Highcharts.chart('T12UtilityExpensesChartContainer', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'T-12 Utility Expenses (per unit)'
                },
                tooltip: {
                    pointFormat: '<b>${point.y}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        /*
                         showInLegend: true,
                         */
                        dataLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: '#0F1A36'
                            }
                        },
                    }
                },
                series: [{
                        name: 'Brands',
                        colorByPoint: true,
                        innerSize: '80%',
                        data: [{
                                name: 'Electricity',
                                y: 130.71
                            }, {
                                name: 'Water',
                                y: 4192.3,
                                sliced: true,
                                selected: true
                            }, {
                                name: 'Garbage and Recycling',
                                y: 3930.36
                            },]
                    }]
            });
        }
    };
    return T12UtilityExpenseChartComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], T12UtilityExpenseChartComponent.prototype, "_data", void 0);
__decorate([
    core_1.ViewChild('chart'),
    __metadata("design:type", core_1.ElementRef)
], T12UtilityExpenseChartComponent.prototype, "el", void 0);
T12UtilityExpenseChartComponent = __decorate([
    core_1.Component({
        selector: 'T12-utility-expenses-chart-container',
        template: "\n       <div #chart id=\"T12UtilityExpensesChartContainer\" style=\"width:100%; height:50%;\"></div>\n       <ul>\n    \n  </ul> \n    "
    }),
    __metadata("design:paramtypes", [angularfire2_1.AngularFire])
], T12UtilityExpenseChartComponent);
exports.T12UtilityExpenseChartComponent = T12UtilityExpenseChartComponent;
//# sourceMappingURL=T12UtilityExpensesChart.component.js.map