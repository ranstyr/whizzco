/**
 * Created by ran.styr on 17/11/2016.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angularfire2_1 = require("angularfire2");
var T12MaintenanceExpensesChartComponent = (function () {
    function T12MaintenanceExpensesChartComponent(_af) {
        this._af = _af;
    }
    T12MaintenanceExpensesChartComponent.prototype.renderChart = function (data) {
        if (this.el.nativeElement) {
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });
            Highcharts.chart('T12MaintenanceExpensesChartContainer', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'T-12 Maintenance Expenses (per unit)',
                    align: 'center',
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
                        type: 'pie',
                        name: 'Expense amount',
                        innerSize: '80%',
                        data: [{
                                name: 'Janitorial',
                                y: 1200
                            }, {
                                name: 'Pest Control',
                                y: 1260,
                                sliced: true,
                                selected: true
                            }, {
                                name: 'Painting',
                                y: 45
                            }, {
                                name: 'Plumbing',
                                y: 990
                            }, {
                                name: 'Roof Repair',
                                y: 3260
                            }, {
                                name: 'General Repairs',
                                y: 466
                            }, {
                                name: 'Supplies',
                                y: 395
                            }]
                    }]
            });
        }
    };
    return T12MaintenanceExpensesChartComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], T12MaintenanceExpensesChartComponent.prototype, "_data", void 0);
__decorate([
    core_1.ViewChild('chart'),
    __metadata("design:type", core_1.ElementRef)
], T12MaintenanceExpensesChartComponent.prototype, "el", void 0);
T12MaintenanceExpensesChartComponent = __decorate([
    core_1.Component({
        selector: 'T12-maintenance-expenses-chart-container',
        template: "\n       <div #chart id=\"T12MaintenanceExpensesChartContainer\" style=\"width:100%; height:50%;\"></div>\n       <ul>\n    \n  </ul> \n    "
    }),
    __metadata("design:paramtypes", [angularfire2_1.AngularFire])
], T12MaintenanceExpensesChartComponent);
exports.T12MaintenanceExpensesChartComponent = T12MaintenanceExpensesChartComponent;
//# sourceMappingURL=T12MaintenanceExpensesChart.component.js.map