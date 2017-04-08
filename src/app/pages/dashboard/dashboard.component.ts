import { Component, EventEmitter } from '@angular/core';
import { FirebaseObjectObservable } from "angularfire2";
import { FormGroup, FormControl } from "@angular/forms";
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { BaPropertiesModel } from "../../theme/services/baModel/BaPropertiesModel";
import { BaThemeSpinner } from "../../theme/services/baThemeSpinner/baThemeSpinner.service";
import { FilterService } from "./filters.service";

declare var moment: any;


import 'style-loader!./dashboard.scss';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html'
})

export class Dashboard {
  //filters
  selectedProperties: Array<string>;
  startDate: Date;
  endDate: Date;
  filtersUpdated: EventEmitter<any> = new EventEmitter();


  // properties
  propertiesRef: FirebaseObjectObservable<any>;
  properties: Array<string>;


  // properties multi select
  multiple1: boolean = true;
  optionsProperties: Array<any> = [];
  logMultipleString: string = '';
  form: FormGroup;

  public eventLog = '';

  // datepicker

  public mainInput = {
    start: moment().subtract(3, 'month'),
    end: moment().subtract(0, 'month')
  };


  constructor( private daterangepickerOptions: DaterangepickerConfig,
               private _BaPropertiesModel: BaPropertiesModel,
               private _spinner: BaThemeSpinner,
               private _filters: FilterService) {

    // dafulat dates value
    this._filters.setDates(this.mainInput.start, this.mainInput.end);

    // datepicker
    this.daterangepickerOptions.settings = {
      locale: {format: 'MM-DD-YYYY'},
      alwaysShowCalendars: false,
      ranges: {
        'Last Month': [ moment().subtract(1, 'month'), moment() ],
        'Last 3 Months': [ moment().subtract(4, 'month'), moment() ],
        'Last 6 Months': [ moment().subtract(6, 'month'), moment() ],
        'Last 12 Months': [ moment().subtract(12, 'month'), moment() ],
      }
    };
  }

  ngOnInit() {

    // multiselct
    this.form = new FormGroup({});
    this.form.addControl('selectSingle', new FormControl(''));
    this.form.addControl('selectMultiple', new FormControl(''));

    this._spinner.hide();

    // properties data

    this._BaPropertiesModel.getDataObservable()
      .subscribe(( value: any ) => {
        if (value.$exists()) {
          let propertiesTemp = this._BaPropertiesModel.getData(value);
          this.properties = propertiesTemp.map(( a ) => {
            return a.PropertyName;
          });
          this.optionsProperties = propertiesTemp.map(( a ) => {
            return {
              value: a.PropertyName.toString(),
              label: a.PropertyName.toString()
            };
          });
        }
      });
  }

  ngOnDestroy() {
    //tbd
  }

  // datePicker////////////////////////
  public calendarEventsHandler( e: any ) {
    console.log(e);
    this.eventLog += '\nEvent Fired: ' + e.event.type;

  }

  private selectedDate( value: any, dateInput: any ) {
    // update filter's dates
    this.startDate = dateInput.start = value.start;
    this.endDate = dateInput.end = value.end;
    this._filters.setDates(this.startDate , this.endDate);


  }

  private applyDate( value: any, dateInput: any ) {
    // update filter's dates
    this.startDate = dateInput.start = value.start;
    this.endDate = dateInput.end = value.end;
    this._filters.setDates(this.startDate , this.endDate);


  }


  ///////////////////////////////////

  // multi selcet  /////////////////////////////////////////////////////////////

  onMultipleOpened() {
    this.logMultiple('- opened');
  }

  onMultipleClosed() {
    this.logMultiple('- closed');
  }

  onMultipleSelected( item ) {
    this.logMultiple('- selected (value: ' + item.value + ', label:' +
      item.label + ')');
    // update filter's selectedProperties
    this.selectedProperties = this.form.getRawValue().selectMultiple ? this.form.getRawValue().selectMultiple : [];
    this._filters.setSelectedProperties(this.selectedProperties);
  }

  onMultipleDeselected( item ) {
    this.logMultiple('- deselected (value: ' + item.value + ', label:' +
      item.label + ')');
    // update filter's selectedProperties
    this.selectedProperties = this.form.getRawValue().selectMultiple ? this.form.getRawValue().selectMultiple : [];
    this._filters.setSelectedProperties(this.selectedProperties);
  }

  private logMultiple( msg: string ) {
    this.logMultipleString += msg + '\n';

    // Let change detection do its work before scrolling to div bottom.
    /*    setTimeout(() => {
     this.scrollToBottom(this.preMultiple.nativeElement);
     });*/
  }

  private scrollToBottom( elem ) {
    elem.scrollTop = elem.scrollHeight;
  }

  /////////////////////////////////////////////////////////////


}
