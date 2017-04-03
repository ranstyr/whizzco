import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Daterangepicker } from 'ng2-daterangepicker';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { BaPropertiesModel } from "../../../../theme/services/model/BaPropertiesModel";
import { FirebaseObjectObservable } from "angularfire2";
import { ModalDirective } from 'ng2-bootstrap';


declare var moment: any;

import 'style-loader!./generate.scss';

@Component({
  selector: 'generate-component',
  templateUrl: 'generate.html',
})

export class GenerateReport {

  // The FormGroup object as you may remember from the simple form example exposes various API’s for dealing with forms. Here we are creating a new object and setting its type to FormGroup
  complexForm: FormGroup;

  //modal
  generateReportModal: any;

  //datepicker

  public mainInput = {
    start: moment().subtract(3, 'month'),
    end: moment().subtract(0, 'month')
  };

  public eventLog = '';


  //selects

  granularity = 'Yearly,Quarterly,Monthly'.split(',');
  selectedGranularity = 'Yearly';

  reports = 'Cash Flow,Cash Reconciling,VAR,Bookkeeping,Budget'.split(',');
  selectedReport = 'Properties';

  //properties
  propertiesRef: FirebaseObjectObservable<any>;
  properties: Array<string>;
  selectedProperty = '';


  //properties multi select
  multiple1: boolean = true;
  optionsProperties: Array<any> = [];
  logMultipleString: string = '';
  form: FormGroup;


  constructor( private daterangepickerOptions: DaterangepickerConfig, private _BaPropertiesModel: BaPropertiesModel ) {
    //datepicker
    this.daterangepickerOptions.settings = {
      locale: {format: 'YYYY-MM-DD'},
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
    //multiselct
    this.form = new FormGroup({});
    this.form.addControl('selectSingle', new FormControl(''));
    this.form.addControl('selectMultiple', new FormControl(''));

    //properties data

    this.propertiesRef = this._BaPropertiesModel.getDataObservable();
    this._BaPropertiesModel.getDataObservable()
      .subscribe(( value: any ) => {
        if(value.$exists()) {
          let propertiesTemp = this._BaPropertiesModel.getData(value);
          this.properties = propertiesTemp.map(( a ) => {
            return a.PropertyName;
          });
          this.optionsProperties = propertiesTemp.map(( a ) => {
            return {
              value: a.PropertyName.toString(),
              label: a.PropertyName.toString()
            }
          });
        }
      });
  }

  ngAfterViewInit() {
  }

  // Again we’ll implement our form submit function that will just console.log the results of our form
  submitForm( value: any ): void {
    console.log('Reactive Form Data: ');
    console.log(value);
    this.generateReportModal = $('#generate-report');
    this.generateReportModal.modal('show');

  }


  //selecor event

  selectorReportOnChange( newValue ) {
    console.log(newValue);
    this.selectedReport = newValue;
    // ... do other stuff here ...
  }

  selectorPropertyOnChange( newValue ) {
    console.log(newValue);
    this.selectedProperty = newValue;
    // ... do other stuff here ...
  }

  selectorGranularityOnChange( newValue ) {
    console.log(newValue);
    this.selectedGranularity = newValue;
    // ... do other stuff here ...
  }


  //datePicker////////////////////////
  private selectedDate( value: any, dateInput: any ) {
    dateInput.start = value.start;
    dateInput.end = value.end;
  }


  private applyDate( value: any, dateInput: any ) {
    dateInput.start = value.start;
    dateInput.end = value.end;
  }

  public calendarEventsHandler( e: any ) {
    console.log(e);
    this.eventLog += '\nEvent Fired: ' + e.event.type;
  }

  ///////////////////////////////////

  //multi selcet  /////////////////////////////////////////////////////////////

  onMultipleOpened() {
    this.logMultiple('- opened');
  }

  onMultipleClosed() {
    this.logMultiple('- closed');
  }

  onMultipleSelected( item ) {
    this.logMultiple('- selected (value: ' + item.value + ', label:' +
      item.label + ')');
  }

  onMultipleDeselected( item ) {
    this.logMultiple('- deselected (value: ' + item.value + ', label:' +
      item.label + ')');
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
