import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class DataService {
  _currentTab : String;

  constructor() {

  }

  //////////////////////ForSelectedDates///////////////////////////////////////////

  public getElectricityMetrixForSelectedDates( propertiesFilterdData ) {
    return propertiesFilterdData[ 'Electricity' ];
  }

  public getWaterMetrixForSelectedDates( propertiesFilterdData ) {
    return propertiesFilterdData[ 'Water' ];
  }

  public getGarbageandRecyclingMetrixForSelectedDates( propertiesFilterdData ) {
    return propertiesFilterdData[ 'Garbage and Recycling' ];
  }

  public getJanitorialMetrixForSelectedDates( propertiesFilterdData ) {
    return propertiesFilterdData[ 'Janitorial' ];
  }

  public getPestControlmetrixForSelectedDates( propertiesFilterdData ) {
    return propertiesFilterdData[ 'Pest Control' ];
  }

  public getPaintingMetrixForSelectedDates( propertiesFilterdData ) {
    return propertiesFilterdData[ 'Painting' ];
  }

  public getPlumbingMetrixForSelectedDates( propertiesFilterdData ) {
    return propertiesFilterdData[ 'Plumbing' ];
  }

  public getRoofRepairMetrixForSelectedDates( propertiesFilterdData ) {
    return propertiesFilterdData[ 'Roof Repair' ];
  }

  public getGeneralRepairsMetrixForSelectedDates( propertiesFilterdData ) {
    return propertiesFilterdData[ 'General Repairs' ];
  }

  public getSuppliesMetrixForSelectedDates( propertiesFilterdData ) {
    return propertiesFilterdData[ 'Supplies' ];
  }

  public getCBBmetrixForSelectedDates( propertiesFilterdData ) {
    return propertiesFilterdData[ 'CBB' ];
  }

  public get2BLmetrixForSelectedDates( propertiesFilterdData ) {
    return propertiesFilterdData[ '2BL' ];
  }

  public getAccumulatedDistributionsmetrixForSelectedDates( propertiesFilterdData ) {
    return propertiesFilterdData[ 'Distributions' ];
  }

  public getBankAccountsmetrixForSelectedDates( propertiesFilterdData ) {

    let CBB = propertiesFilterdData[ 'CBB' ];
    let BL = propertiesFilterdData[ '2BL' ];
    let securityDeposits = propertiesFilterdData[ 'Security Deposits' ];
    let prepaidRent = propertiesFilterdData[ 'Prepaid Rent' ];

    let arr = [];
    arr.push(CBB, BL, securityDeposits, prepaidRent);
    return this.aggregateObjectArrToDateArr(arr);
  }

  public getUtilitiesMetricsForSelectedDates( propertiesFilterdData ) {

    let electricity = (propertiesFilterdData[ 'Electricity' ]);
    let water = (propertiesFilterdData[ 'Water' ]);
    let garbageAndRecycling = (propertiesFilterdData[ 'Garbage and Recycling' ]);
    let gas = (propertiesFilterdData[ 'Gas' ]);
    let phoneAndInternet = (propertiesFilterdData[ 'Phone and Internet' ]);

    let arr = [];
    arr.push(electricity, water, garbageAndRecycling, gas, phoneAndInternet);

    return this.aggregateObjectArrToDateArr(arr);
  }

  public getMaintenanceMetricsForSelectedDates( propertiesFilterdData ) {

    let fireSafety = (propertiesFilterdData[ 'Fire Safety' ]);
    let janitorialExpense = (propertiesFilterdData[ 'Janitorial Expense' ]);
    let landscaping = (propertiesFilterdData[ 'Landscaping' ]);
    let locksmith = (propertiesFilterdData[ 'Locksmith' ]);
    let painting = (propertiesFilterdData[ 'Painting' ]);
    let plumbing = (propertiesFilterdData[ 'Plumbing' ]);
    let elevator = (propertiesFilterdData[ 'Elevator' ]);
    let roofRepair = (propertiesFilterdData[ 'Roof Repair' ]);
    let generalRepairs = (propertiesFilterdData[ 'General Repairs' ]);
    let supplies = (propertiesFilterdData[ 'Supplies' ]);
    let flooring = (propertiesFilterdData[ 'Flooring' ]);
    let HVAC = (propertiesFilterdData[ 'HVAC' ]);
    let carpetCleaning = (propertiesFilterdData[ 'Carpet Cleaning' ]);

    let arr = [];
    arr.push(fireSafety, janitorialExpense, landscaping, locksmith, painting, plumbing, elevator, roofRepair,
      generalRepairs, supplies, flooring, HVAC, carpetCleaning);

    return this.aggregateObjectArrToDateArr(arr);
  }

  public getLeaseTIMetricsForSelectedDates( propertiesFilterdData ) {

    let TI = (propertiesFilterdData[ 'TI' ]);
    let leasingCommission = (propertiesFilterdData[ 'Leasing Commission' ]);

    let arr = [];
    arr.push(TI, leasingCommission);

    return this.aggregateObjectArrToDateArr(arr);
  }

  public getFeesMetricsForSelectedDates( propertiesFilterdData ) {

    let propertyManagementFees = (propertiesFilterdData[ 'Property Management Fees' ]);
    let hoaFees = (propertiesFilterdData[ 'HOA Fees' ]);

    let arr = [];
    arr.push(propertyManagementFees, hoaFees);

    return this.aggregateObjectArrToDateArr(arr);
  }

  public getLandlordExpensesMetricsForSelectedDates( propertiesFilterdData ) {

    let licensesandPermits = (propertiesFilterdData[ 'Licenses and Permits' ]);
    let propertyTax = (propertiesFilterdData[ 'Property Tax' ]);
    let insurance = (propertiesFilterdData[ 'Insurance' ]);
    let otherExpenses = (propertiesFilterdData[ 'Other expenses' ]);

    let arr = [];
    arr.push(licensesandPermits, propertyTax, insurance, otherExpenses);
    return this.aggregateObjectArrToDateArr(arr);


  }

  public getDebtServiceMetricsForSelectedDates( propertiesFilterdData ) {

    let interestPayments = (propertiesFilterdData[ 'Interest Payments' ]);
    let amortization = (propertiesFilterdData[ 'Amortization' ]);

    let arr = [];
    arr.push(interestPayments, amortization);
    return this.aggregateObjectArrToDateArr(arr);
  }

  public getCAPEXMetricsForSelectedDates( propertiesFilterdData ) {

    let otherCapex = (propertiesFilterdData[ 'Other Capex' ]);
    let improvements = (propertiesFilterdData[ 'Improvements' ]);

    let arr = [];
    arr.push(otherCapex, improvements);
    return this.aggregateObjectArrToDateArr(arr);
  }

  public getManagementExpensesMetricsForSelectedDates( propertiesFilterdData ) {

    let legal = (propertiesFilterdData[ 'Legal' ]);
    let accounting = this.objectValeuSum(propertiesFilterdData[ 'Accounting' ]);
    let bankFees = (propertiesFilterdData[ 'Bank Fees' ]);
    let finacingFees = (propertiesFilterdData[ 'Finacing Fees' ]);
    let assetManagementFees = (propertiesFilterdData[ 'Asset Management Fees' ]);
    let marketing = (propertiesFilterdData[ 'Marketing' ]);

    let arr = [];
    arr.push(legal, accounting, bankFees, finacingFees, assetManagementFees, marketing);
    return this.aggregateObjectArrToDateArr(arr);

  }

  public getRevenuesMetricsForSelectedDates( propertiesFilterdData ) {


    let residentialRental = (propertiesFilterdData[ 'Residential Rental' ]);
    let commercialRental = (propertiesFilterdData[ 'Commercial Rental' ]);
    let other = (propertiesFilterdData[ 'Other' ]);
    let CAM = (propertiesFilterdData[ 'CAM' ]);
    let passThrough = (propertiesFilterdData[ 'Pass Through' ]);
    let utilityReimbursement = (propertiesFilterdData[ 'Utility Reimbursement' ]);
    let lateFee = (propertiesFilterdData[ 'Late Fee' ]);
    let leaseBreakFee = (propertiesFilterdData[ 'Lease Break Fee' ]);
    let laundryIncome = (propertiesFilterdData[ 'Laundry Income' ]);
    let collectionLoss = (propertiesFilterdData[ 'Collection Loss' ]);


    let arr = [];
    arr.push(residentialRental, commercialRental, other, CAM, passThrough, utilityReimbursement, lateFee, leaseBreakFee,
      laundryIncome, collectionLoss);
    return this.aggregateObjectArrToDateArr(arr);
  }

  public getOperatingExpensesMetricsForSelectedDates( propertiesFilterdData ) {

    let landlord = this.getLandlordExpensesMetricsForSelectedDates(propertiesFilterdData);
    let maintenance = this.getMaintenanceMetricsForSelectedDates(propertiesFilterdData);
    let utilities = this.getUtilitiesMetricsForSelectedDates(propertiesFilterdData);
    let feed = this.getFeesMetricsForSelectedDates(propertiesFilterdData);

    let arr = [];
    arr.push(landlord, maintenance, utilities, feed);
    return this.aggregateObjectArrToDateArr(arr);
  }


  //////////////////////SUM///////////////////////////////////////////
  public getSumUtilitiesMetrics( propertiesFilterdData ) {

    let electricity = this.objectValeuSum(propertiesFilterdData[ 'Electricity' ]);
    let water = this.objectValeuSum(propertiesFilterdData[ 'Water' ]);
    let garbageAndRecycling = this.objectValeuSum(propertiesFilterdData[ 'Garbage and Recycling' ]);
    let gas = this.objectValeuSum(propertiesFilterdData[ 'Gas' ]);
    let phoneAndInternet = this.objectValeuSum(propertiesFilterdData[ 'Phone and Internet' ]);

    return electricity + water + garbageAndRecycling + gas + phoneAndInternet;
  }

  public getSumMaintenanceMetrics( propertiesFilterdData ) {

    let fireSafety = this.objectValeuSum(propertiesFilterdData[ 'Fire Safety' ]);
    let janitorialExpense = this.objectValeuSum(propertiesFilterdData[ 'Janitorial Expense' ]);
    let landscaping = this.objectValeuSum(propertiesFilterdData[ 'Landscaping' ]);
    let locksmith = this.objectValeuSum(propertiesFilterdData[ 'Locksmith' ]);
    let painting = this.objectValeuSum(propertiesFilterdData[ 'Painting' ]);
    let plumbing = this.objectValeuSum(propertiesFilterdData[ 'Plumbing' ]);
    let elevator = this.objectValeuSum(propertiesFilterdData[ 'Elevator' ]);
    let roofRepair = this.objectValeuSum(propertiesFilterdData[ 'Roof Repair' ]);
    let generalRepairs = this.objectValeuSum(propertiesFilterdData[ 'General Repairs' ]);
    let supplies = this.objectValeuSum(propertiesFilterdData[ 'Supplies' ]);
    let flooring = this.objectValeuSum(propertiesFilterdData[ 'Flooring' ]);
    let HVAC = this.objectValeuSum(propertiesFilterdData[ 'HVAC' ]);
    let carpetCleaning = this.objectValeuSum(propertiesFilterdData[ 'Carpet Cleaning' ]);

    return fireSafety + janitorialExpense + landscaping + locksmith + painting + plumbing + elevator + roofRepair +
      generalRepairs + supplies + flooring + HVAC + carpetCleaning;
  }

  public getSumLeaseTIMetrics( propertiesFilterdData ) {

    let TI = this.objectValeuSum(propertiesFilterdData[ 'TI' ]);
    let leasingCommission = this.objectValeuSum(propertiesFilterdData[ 'Leasing Commission' ]);

    return TI + leasingCommission;
  }

  public getSumFeesMetrics( propertiesFilterdData ) {

    let propertyManagementFees = this.objectValeuSum(propertiesFilterdData[ 'Property Management Fees' ]);
    let hoaFees = this.objectValeuSum(propertiesFilterdData[ 'HOA Fees' ]);

    return propertyManagementFees + hoaFees;
  }

  public getSumLandlordExpensesMetrics( propertiesFilterdData ) {

    let licensesandPermits = this.objectValeuSum(propertiesFilterdData[ 'Licenses and Permits' ]);
    let propertyTax = this.objectValeuSum(propertiesFilterdData[ 'Property Tax' ]);
    let insurance = this.objectValeuSum(propertiesFilterdData[ 'Insurance' ]);
    let otherExpenses = this.objectValeuSum(propertiesFilterdData[ 'Other expenses' ]);

    return licensesandPermits + propertyTax + insurance + otherExpenses;
  }

  public getSumDebtServiceMetrics( propertiesFilterdData ) {

    let interestPayments = this.objectValeuSum(propertiesFilterdData[ 'Interest Payments' ]);
    let amortization = this.objectValeuSum(propertiesFilterdData[ 'Amortization' ]);

    return interestPayments + amortization;
  }

  public getSumCAPEXMetrics( propertiesFilterdData ) {

    let otherCapex = this.objectValeuSum(propertiesFilterdData[ 'Other Capex' ]);
    let improvements = this.objectValeuSum(propertiesFilterdData[ 'Improvements' ]);

    return otherCapex + improvements;
  }

  public getSumManagementExpensesMetrics( propertiesFilterdData ) {

    let legal = this.objectValeuSum(propertiesFilterdData[ 'Legal' ]);
    let accounting = this.objectValeuSum(propertiesFilterdData[ 'Accounting' ]);
    let bankFees = this.objectValeuSum(propertiesFilterdData[ 'Bank Fees' ]);
    let finacingFees = this.objectValeuSum(propertiesFilterdData[ 'Finacing Fees' ]);
    let assetManagementFees = this.objectValeuSum(propertiesFilterdData[ 'Asset Management Fees' ]);
    let marketing = this.objectValeuSum(propertiesFilterdData[ 'Marketing' ]);

    return legal + accounting + bankFees + finacingFees + assetManagementFees + marketing;

  }

  public getSumRevenuesMetrics( propertiesFilterdData ) {


    let residentialRental = this.objectValeuSum(propertiesFilterdData[ 'Residential Rental' ]);
    let commercialRental = this.objectValeuSum(propertiesFilterdData[ 'Commercial Rental' ]);
    let other = this.objectValeuSum(propertiesFilterdData[ 'Other' ]);
    let CAM = this.objectValeuSum(propertiesFilterdData[ 'CAM' ]);
    let passThrough = this.objectValeuSum(propertiesFilterdData[ 'Pass Through' ]);
    let utilityReimbursement = this.objectValeuSum(propertiesFilterdData[ 'Utility Reimbursement' ]);
    let lateFee = this.objectValeuSum(propertiesFilterdData[ 'Late Fee' ]);
    let leaseBreakFee = this.objectValeuSum(propertiesFilterdData[ 'Lease Break Fee' ]);
    let laundryIncome = this.objectValeuSum(propertiesFilterdData[ 'Laundry Income' ]);
    let collectionLoss = this.objectValeuSum(propertiesFilterdData[ 'Collection Loss' ]);

    return residentialRental + commercialRental + other + CAM + passThrough + utilityReimbursement + lateFee + leaseBreakFee +
      laundryIncome + collectionLoss;
  }

  public getSumOperatingExpensesMetrics( propertiesFilterdData ) {

    return this.getSumLandlordExpensesMetrics(propertiesFilterdData) + this.getSumMaintenanceMetrics(propertiesFilterdData)
      + this.getSumUtilitiesMetrics(propertiesFilterdData) + this.getSumFeesMetrics(propertiesFilterdData);
  }

  public getSumOperatingExpenseRatioMetrics( propertiesFilterdData ) {

    return this.getSumOperatingExpensesMetrics(propertiesFilterdData) / this.getSumRevenuesMetrics(propertiesFilterdData);
  }

  public getSumNOIMetrics( propertiesFilterdData ) {

    return this.getSumRevenuesMetrics(propertiesFilterdData) / this.getSumOperatingExpensesMetrics(propertiesFilterdData);
  }

  public getSumNetCashIncomeMetrics( propertiesFilterdData ) {

    return this.getSumNOIMetrics(propertiesFilterdData)
      - this.getSumDebtServiceMetrics(propertiesFilterdData)
      - this.getSumManagementExpensesMetrics(propertiesFilterdData)
      - this.getSumLeaseTIMetrics(propertiesFilterdData)
      - this.getSumCAPEXMetrics(propertiesFilterdData);
  }

  public getSumDCRMetrics( propertiesFilterdData ) {

    return this.getSumNOIMetrics(propertiesFilterdData)
      - this.getSumDebtServiceMetrics(propertiesFilterdData);
  }

  public getSumAccumulatedDistributionsMetrics( propertiesFilterdData ) {

    let investorDistributions = this.objectValeuSum(propertiesFilterdData[ 'Distributions' ]);

    return investorDistributions;
  }

  public getSumBankAccountsMetrics( propertiesFilterdData ) {
    //let bankMetrics = ['CBB','2BL','Security Deposits','Prepaid Rent'];

    let CBB = this.objectValeuSum(propertiesFilterdData.CBB);
    let BL = this.objectValeuSum(propertiesFilterdData[ '2BL' ]);
    let securityDeposits = this.objectValeuSum(propertiesFilterdData[ 'Security Deposits' ]);
    let prepaidRent = this.objectValeuSum(propertiesFilterdData[ 'Prepaid Rent' ]);

    return CBB + BL + securityDeposits + prepaidRent;

  }

  public getSumCashInfusionMetrics( propertiesFilterdData ) {
    let cashInfusion = this.objectValeuSum(propertiesFilterdData[ 'Cash Infusion' ]);

    return cashInfusion;
  }


  //////////////////////Utils///////////////////////////////////////////


  public aggregateObjectArr( arr ) {
    // arr is null or empty
    if (_.isEmpty(arr) || arr.length === 0) return [];

    let newObj = _.cloneDeep(arr[ 0 ]);
    for (let index = 1; index < arr.length; index++) {
      for (let key in arr[ index ]) {
        if (_.isEmpty(arr[ index ])) {

        }
        else {
          let currentVal = newObj[ key ] ? newObj[ key ] : 0;
          let newVal = arr[ index ][ key ] ? arr[ index ][ key ] : 0;

          newObj[ key ] = currentVal + newVal;
        }
      }
    }
    return newObj;
  }

  public aggregateObjectArrToDateArr( arr ) {
    // arr is null or empty
    if (_.isEmpty(arr) || arr.length === 0) return [];

    // find the first non eempty object
    let ind = 0;
    for (ind = 0; ind < arr.length; ind++) {
      if (!(_.isEmpty(arr[ ind ]))) {
        break;
      }
    }

    let newObj = _.cloneDeep(arr[ ind ]);


    let newArr: any;
    newArr = [];

    for (let index = ind + 1; index < arr.length; index++) {
      for (let key in arr[ index ]) {
        if (_.isEmpty(arr[ index ])) {

        }
        else {
          let currentVal = newObj[ key ] ? newObj[ key ] : 0;
          let newVal = arr[ index ][ key ] ? arr[ index ][ key ] : 0;

          newObj[ key ] = currentVal + newVal;
        }
      }
    }
    return newObj;
  }

  public transformObjectToArray( object ) {
    //todo ran - make sure it is sorted by dates
    /*  15-01-2016 :  289284.2
     15-02-2016 :  289284.2
     15-03-2016 :  289284.2
     To:
     [289284.2 , 289284.2 ,289284.2]*/

    if (_.isEmpty(object)) {
      return [];
    }
    let arr = [];
    for (let key in object) {
      arr.push(object[ key ]);
    }
    return arr;

  }

  //sum all values of array to one value
  public objectValeuSum( metricTypeObj ) {
    // if metricTypeObj is null return 0
    if (!metricTypeObj) {
      return 0;
    }
    ;
    return Object.keys(metricTypeObj)
      .reduce(( sum, key ) => {
        if (key === 'MetricName') {
          return sum;
        }
        ;
        return sum + parseFloat(metricTypeObj[ key ]);
      }, 0);

    /*    return metricTypeObj ? Object.keys(metricTypeObj)
     .reduce(( sum, key ) => {
     return key!=='MetricName' ? sum + parseFloat(metricTypeObj[ key ]) : 0;
     }, 0) : 0;*/
  };

  //divide array by diffrent Array (i.e. divide values by index)
  public divideArrayElementsByArrayElements( arrA, arrB ) {
    //check both inputs are Array
    if (!(Object.prototype.toString.call(arrA) === '[object Array]')) return [];
    if (!(Object.prototype.toString.call(arrB) === '[object Array]')) return [];

    return arrA.map(function ( n, i ) {
      let result = n / arrB[ i ];
      if (result === Infinity) {
        result = 9007199254740992;
      }
      return result;
    });
  }

  //add array to diffrent Array (i.e. sum values by index)
  public addArrayElementsByArrayElements( arrA, arrB ) {
    return arrA.map(function ( n, i ) {
      return n + arrB[ i ];
    });
  }

  // filter properties Array to selected properties
  public getFilterDataByProperties( propertiesArray: Object , selectedProperties : Array<string> ): Array <string> {

    if (_.isEmpty(propertiesArray)) return [];

    // than filter it
    let tempArr = _.filter(propertiesArray, ( o: any ) => {
      return _.indexOf(selectedProperties, o.PropertyID) > -1;
    });

    return tempArr;
  }



  /////////////////other//////////////

  public setCurrentTab(currentTab){
    this._currentTab = currentTab;
  }

  public getCurrentTab(){
    return this._currentTab;
  }

}

