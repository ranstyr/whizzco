"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var MortgageBalanceChartComponent = (function () {
    function MortgageBalanceChartComponent() {
    }
    MortgageBalanceChartComponent.prototype.renderChart = function (data) {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ',',
            }
        });
        Highcharts.chart('mortgage-balance-chart-container', {
            chart: {
                type: 'column',
                backgroundColor: null
            },
            title: {
                text: 'Mortgage Balance'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                labels: {
                    format: '${value}'
                },
                min: 0,
                title: '',
                stackLabels: {
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'center',
                x: 10,
                verticalAlign: 'bottom',
                y: 0,
                floating: false,
                backgroundColor: null,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
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
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: [{
                    name: 'Mortgage',
                    data: [1725609.71, 1723018.73, 1720418.16, 2000000, 2000000, 1997118.22, 1994228.57, 1991328.96, 1988419.69, 1985501.06, 1982572.39, 1979643.72]
                }]
        });
    };
    __decorate([
        core_1.Input()
    ], MortgageBalanceChartComponent.prototype, "_data", void 0);
    __decorate([
        core_1.ViewChild('chart')
    ], MortgageBalanceChartComponent.prototype, "el", void 0);
    MortgageBalanceChartComponent = __decorate([
        core_1.Component({
            selector: 'mortgage-balance-chart',
            template: "\n       <div id=\"mortgage-balance-chart-container\" style=\"width:100%; height:50%;\"></div>\n       <ul>\n    \n  </ul> \n    "
        })
    ], MortgageBalanceChartComponent);
    return MortgageBalanceChartComponent;
}());
exports.MortgageBalanceChartComponent = MortgageBalanceChartComponent;
