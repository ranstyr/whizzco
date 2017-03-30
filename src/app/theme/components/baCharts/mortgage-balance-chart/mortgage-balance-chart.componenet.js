"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angularfire2_1 = require("angularfire2");
var mortgageBalanceChartComponent = (function () {
    function mortgageBalanceChartComponent(_af) {
        this._af = _af;
    }
    mortgageBalanceChartComponent.prototype.renderChart = function (data) {
        if (this.el.nativeElement) {
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });
            Highcharts.chart('mortgage-balance-chart1-container', {
                chart: {
                    type: 'column'
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
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    shadow: false
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
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
        }
    };
    return mortgageBalanceChartComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], mortgageBalanceChartComponent.prototype, "_data", void 0);
__decorate([
    core_1.ViewChild('chart'),
    __metadata("design:type", core_1.ElementRef)
], mortgageBalanceChartComponent.prototype, "el", void 0);
mortgageBalanceChartComponent = __decorate([
    core_1.Component({
        selector: 'mortgage-balance-chart',
        template: "\n       <div #chart id=\"mortgage-balance-chart-container\" style=\"width:100%; height:50%;\"></div>\n       <ul>\n    \n  </ul> \n    "
    }),
    __metadata("design:paramtypes", [angularfire2_1.AngularFire])
], mortgageBalanceChartComponent);
exports.mortgageBalanceChartComponent = mortgageBalanceChartComponent;
//# sourceMappingURL=mortgage-balance-chart.componenet.js.map