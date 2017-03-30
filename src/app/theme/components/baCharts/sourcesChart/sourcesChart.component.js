/**
 * Created by ran.styr on 17/11/2016.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angularfire2_1 = require("angularfire2");
var sourcesChartComponent = (function () {
    function sourcesChartComponent(_af) {
        this._af = _af;
    }
    sourcesChartComponent.prototype.renderChart = function (data) {
        if (this.el.nativeElement) {
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });
            Highcharts.chart('sourcesChartContainer', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    align: 'center',
                    text: 'T-12 Cash Sources'
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
                        name: 'Source',
                        colorByPoint: true,
                        data: [{
                                name: 'Property net income',
                                y: 44275
                            }, {
                                name: 'Cash reserve',
                                y: 12040,
                                sliced: true,
                                selected: true
                            }, {
                                name: 'Refinancing',
                                y: 277370
                            }]
                    }]
            });
        }
    };
    return sourcesChartComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], sourcesChartComponent.prototype, "_data", void 0);
__decorate([
    core_1.ViewChild('chart'),
    __metadata("design:type", core_1.ElementRef)
], sourcesChartComponent.prototype, "el", void 0);
sourcesChartComponent = __decorate([
    core_1.Component({
        selector: 'sources-chart',
        template: "\n       <div #chart id=\"sourcesChartContainer\" style=\"width:100%; background-color:#FFFFFF; height:100%;\"></div>\n       <ul>\n    \n  </ul> \n    "
    }),
    __metadata("design:paramtypes", [angularfire2_1.AngularFire])
], sourcesChartComponent);
exports.sourcesChartComponent = sourcesChartComponent;
//# sourceMappingURL=sourcesChart.component.js.map