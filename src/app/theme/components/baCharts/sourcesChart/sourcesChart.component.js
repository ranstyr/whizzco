/**
 * Created by ran.styr on 17/11/2016.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SourcesChartComponent = (function () {
    function SourcesChartComponent() {
    }
    SourcesChartComponent.prototype.renderChart = function (data) {
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
                    type: 'pie',
                    backgroundColor: null
                },
                title: {
                    align: 'center',
                    text: 'Cash Sources'
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
                navigation: {
                    buttonOptions: {
                        theme: {
                            fill: "#71B0D9",
                            states: {
                                hover: {
                                    fill: '#5585C0'
                                },
                                select: {
                                    stroke: '#039',
                                    fill: '#5585C0'
                                }
                            }
                        }
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
    __decorate([
        core_1.Input()
    ], SourcesChartComponent.prototype, "_data", void 0);
    __decorate([
        core_1.ViewChild('chart')
    ], SourcesChartComponent.prototype, "el", void 0);
    SourcesChartComponent = __decorate([
        core_1.Component({
            selector: 'sources-chart',
            template: "\n       <div #chart id=\"sourcesChartContainer\" style=\"width:100%;height:100%;\"></div>\n       <ul>\n    \n  </ul> \n    "
        })
    ], SourcesChartComponent);
    return SourcesChartComponent;
}());
exports.SourcesChartComponent = SourcesChartComponent;
