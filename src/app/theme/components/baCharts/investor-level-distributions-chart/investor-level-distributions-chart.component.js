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
var InvestorLevelDistributionsChartComponent = (function () {
    function InvestorLevelDistributionsChartComponent() {
    }
    InvestorLevelDistributionsChartComponent.prototype.renderChart = function (data) {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        Highcharts.chart('investor-level-distributions-chart-container', {
            chart: {
                zoomType: 'xy',
                backgroundColor: null
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
    __decorate([
        core_1.Input()
    ], InvestorLevelDistributionsChartComponent.prototype, "_data", void 0);
    InvestorLevelDistributionsChartComponent = __decorate([
        core_1.Component({
            selector: 'investor-level-distributions-chart',
            template: "\n       <div id=\"investor-level-distributions-chart-container\" style=\"width:100%; height:50%;\"></div>\n       <ul>\n    \n  </ul> \n    "
        })
    ], InvestorLevelDistributionsChartComponent);
    return InvestorLevelDistributionsChartComponent;
}());
exports.InvestorLevelDistributionsChartComponent = InvestorLevelDistributionsChartComponent;
