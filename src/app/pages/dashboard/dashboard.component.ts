import {Component} from '@angular/core';
import { FirebaseObjectObservable } from "angularfire2";
import { FormGroup, FormControl } from "@angular/forms";
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { BaPropertiesModel } from "../../theme/services/model/BaPropertiesModel";

declare var moment: any;

import 'style-loader!./dashboard.scss';
import { BaThemeSpinner } from "../../theme/services/baThemeSpinner/baThemeSpinner.service";


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html'
})

export class Dashboard {

  //properties
  propertiesRef: FirebaseObjectObservable<any>;
  properties: Array<string>;
  selectedProperty = '';


  //properties multi select
  multiple1: boolean = true;
  optionsProperties: Array<any> = [];
  logMultipleString: string = '';
  form: FormGroup;

  public eventLog = '';

  //datepicker

  public mainInput = {
    start: moment().subtract(3, 'month'),
    end: moment().subtract(0, 'month')
  };


  constructor(private daterangepickerOptions: DaterangepickerConfig ,
              private _BaPropertiesModel: BaPropertiesModel,
              private _spinner: BaThemeSpinner) {
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

    this._spinner.hide();

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
