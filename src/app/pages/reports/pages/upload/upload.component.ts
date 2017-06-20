import { Component, ElementRef, ViewChild } from '@angular/core';
import 'style-loader!./upload.scss';
import { FormGroup, FormControl } from "@angular/forms";
import { Daterangepicker } from 'ng2-daterangepicker';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { BaPropertiesModel } from "../../../../theme/services/baModel/BaPropertiesModel";
import { FirebaseObjectObservable } from "angularfire2";
import { ModalDirective } from 'ng2-bootstrap';
import { NgUploaderOptions } from "ngx-uploader";
import { BaFilesUploader } from "../../../../theme/components/baFilesUploader/baFilesUploader.component";
import { BaPropertiesDataModel } from "../../../../theme/services/baModel/BaPropertiesDataModel";
import { Router } from "@angular/router";


@Component({
  selector: 'upload-component',
  templateUrl: 'upload.html',
})

export class UploadReport {

  reports = 'DataBase'.split(',');
  selectedReport = 'DataBase';

  _data : any;

  //properties multi select
  propertiesRef: FirebaseObjectObservable<any>;
  properties: Array<string>;
  selectedProperty = '';

  multiple1: boolean = true;
  optionsProperties: Array<any> = [];
  logMultipleString: string = '';
  form: FormGroup;

  @ViewChild(BaFilesUploader) BaFilesUploader: BaFilesUploader;


  constructor( private _BaPropertiesModel: BaPropertiesDataModel , private router : Router ) {
    this._BaPropertiesModel.getWebSitesObservable()
      .subscribe(
      value => {
        console.log("websites data reterived from firebase : ", (value ? Object.keys(value) : null));
        this._data = value;
      },
      err => console.error("error at BaPropertiesModel - _ref.subscribe" + err + err ? err.message : err)
    );
  }

  ngOnInit() {
    //properties multiselct
    this.form = new FormGroup({});
    this.form.addControl('selectSingle', new FormControl(''));
    this.form.addControl('selectMultiple', new FormControl(''));

  }

  ngAfterViewInit() {
  }

  // Again we’ll implement our form submit function that will just console.log the results of our form
  submitForm( value: any ): void {
    console.log('Reactive Form Data: ');
    console.log(value);
    this.BaFilesUploader.handleFileSelect();
  }

  onClick(id){
/*
    this.router.navigateByUrl( 'pages/properties');
*/
    this.router.navigate([ '/pages/properties' ], {queryParams: {id: id}});

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
