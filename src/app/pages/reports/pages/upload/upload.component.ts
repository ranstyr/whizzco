import { Component, ElementRef, ViewChild } from '@angular/core';
import 'style-loader!./upload.scss';
import { FormGroup, FormControl } from "@angular/forms";
import { Daterangepicker } from 'ng2-daterangepicker';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { BaPropertiesModel } from "../../../../theme/services/model/BaPropertiesModel";
import { FirebaseObjectObservable } from "angularfire2";
import { ModalDirective } from 'ng2-bootstrap';
import { NgUploaderOptions } from "ngx-uploader";
import { BaFilesUploader } from "../../../../theme/components/baFilesUploader/baFilesUploader.component";




@Component({
  selector: 'upload-component',
  templateUrl: 'upload.html',
})

export class UploadReport {

  reports = 'Properties,General Ledger,Budget,Rent Roll,Bank statements,Landlord expenses,Partnership expenses,corporate expense'.split(',');
  selectedReport = 'Properties';

  //properties multi select
  propertiesRef: FirebaseObjectObservable<any>;
  properties: Array<string>;
  selectedProperty = '';

  multiple1: boolean = true;
  optionsProperties: Array<any> = [];
  logMultipleString: string = '';
  form: FormGroup;

  @ViewChild(BaFilesUploader) BaFilesUploader: BaFilesUploader;



  constructor( private _BaPropertiesModel: BaPropertiesModel ) {

  }

  ngOnInit() {
    //properties multiselct
    this.form = new FormGroup({});
    this.form.addControl('selectSingle', new FormControl(''));
    this.form.addControl('selectMultiple', new FormControl(''));

    //properties data

    this.propertiesRef = this._BaPropertiesModel.getDataObservable();
    this._BaPropertiesModel.getDataObservable()
      .subscribe(( value: any ) => {

        if(value.$exists()){
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
    this.BaFilesUploader.handleFileSelect();
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




  //properties multi selcet  /////////////////////////////////////////////////////////////

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
