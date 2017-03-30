/**
 * Created by ran.styr on 17/11/2016.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angularfire2_1 = require("angularfire2");
var cashReservesChartComponent = (function () {
    function cashReservesChartComponent(_af) {
        this._af = _af;
    }
    cashReservesChartComponent.prototype.renderChart = function (data) {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ',',
            }
        });
        Highcharts.chart('cash-reserves-chart-container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Cash Reserves'
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
                    enabled: false,
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
                    name: '2BL',
                    data: [13759.78, 13770.81, 13343.72, 7518.75, 13330.22, 13748.75, 7101.22, 13316.22, 13028.87, 7291.22, 16788.75, 1000]
                }, {
                    name: 'CBB',
                    data: [12040.09, 19057.94, 23822.8, 222923.15, 239483.2, 137940.69, 147064.2, 103680.76, 109896.67, 115797.77, 119380.33, 128996.94]
                }]
        });
    };
    return cashReservesChartComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], cashReservesChartComponent.prototype, "_data", void 0);
cashReservesChartComponent = __decorate([
    core_1.Component({
        selector: 'cash-reserves-chart',
        template: "\n       <div id=\"cash-reserves-chart-container\" style=\"width:100%; height:50%;\"></div>\n       <ul>\n    \n  </ul> \n    "
    }),
    __metadata("design:paramtypes", [angularfire2_1.AngularFire])
], cashReservesChartComponent);
exports.cashReservesChartComponent = cashReservesChartComponent;
//# sourceMappingURL=cash-reserves-chart.component.js.map