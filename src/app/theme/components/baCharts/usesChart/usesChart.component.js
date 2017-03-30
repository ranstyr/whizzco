/**
 * Created by ran.styr on 17/11/2016.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angularfire2_1 = require("angularfire2");
var usesChartComponent = (function () {
    function usesChartComponent(_af) {
        this._af = _af;
    }
    usesChartComponent.prototype.renderChart = function (data) {
        if (this.el.nativeElement) {
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });
            Highcharts.chart('usesChartContainer', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    align: 'center',
                    text: 'T-12 Cash Uses'
                },
                tooltip: {
                    pointFormat: '<b>${point.y}</b> Share: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                            style: {
                                fontWeight: 'bold',
                                color: '#0F1A36'
                            }
                        },
                        showInLegend: true
                    }
                },
                series: [{
                        innerSize: '80%',
                        name: 'Uses',
                        colorByPoint: true,
                        data: [{
                                name: 'Distributions',
                                y: 203924
                            }, {
                                name: 'Consolidated Cash Reserves',
                                y: 129997,
                                sliced: true,
                                selected: true
                            }]
                    }]
            });
        }
    };
    return usesChartComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], usesChartComponent.prototype, "_data", void 0);
__decorate([
    core_1.ViewChild('chart'),
    __metadata("design:type", core_1.ElementRef)
], usesChartComponent.prototype, "el", void 0);
usesChartComponent = __decorate([
    core_1.Component({
        selector: 'uses-chart',
        template: "\n       <div #chart id=\"usesChartContainer\" style=\"width:100%; background-color:#FFFFFF;  height:100%;\"></div>\n       <ul>\n    \n  </ul> \n    "
    }),
    __metadata("design:paramtypes", [angularfire2_1.AngularFire])
], usesChartComponent);
exports.usesChartComponent = usesChartComponent;
//# sourceMappingURL=usesChart.component.js.map