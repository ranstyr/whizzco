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
var UsesChartComponent = (function () {
    function UsesChartComponent() {
    }
    UsesChartComponent.prototype.renderChart = function (data) {
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
                    type: 'pie',
                    backgroundColor: null
                },
                title: {
                    align: 'center',
                    text: 'Cash Uses'
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
                            fill: "#5B8DB5",
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
    __decorate([
        core_1.Input()
    ], UsesChartComponent.prototype, "_data", void 0);
    __decorate([
        core_1.ViewChild('chart')
    ], UsesChartComponent.prototype, "el", void 0);
    UsesChartComponent = __decorate([
        core_1.Component({
            selector: 'uses-chart',
            template: "\n       <div #chart id=\"usesChartContainer\" style=\"width:100%; height:100%;\"></div>\n       <ul>\n    \n  </ul> \n    "
        })
    ], UsesChartComponent);
    return UsesChartComponent;
}());
exports.UsesChartComponent = UsesChartComponent;
