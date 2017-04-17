import {Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { Observable } from "rxjs";

@Component({
  selector: 'ba-files-uploader',
  styleUrls: ['./baFilesUploader.scss'],
  templateUrl: './baFilesUploader.html',
})
export class BaFilesUploader {

  @Input() selectedReport:any;
  @Input() selectedProperty:any;


  uploadModal: any;
  company: string;
  uploadFile:any;
  fileWasUploadModal: any;
  data = [];
  storageRef: any;
  databaseRef: any;
  filesToUpload: Array<File>;
  uploadTasks: any;
  filesResult: any;
  resultArr: any;
  progress: string;
  child: any;
  fileName: string;



  constructor(private renderer: Renderer) {
    // Create a root reference for firebase storage
    this.company = localStorage.getItem('company');
    this.storageRef = firebase.storage().ref();
    this.databaseRef = firebase.database().ref().child('queue/tasks');
    this.uploadTasks = [];
    this.filesResult = {};
    this.resultArr = [];
    this.progress = '0';
    this.fileName = '';
    this.filesToUpload = [];
  }

  fileChangeEvent( fileInput: any ) {

    this.uploadModal = $('#importFile');
    this.fileWasUploadModal = $('#fileWasUpload');
    this.uploadFile = $('#uploadFile');


    let source = Observable.fromEvent(this.uploadModal, 'hidden.bs.modal');
    source.subscribe(( e ) => {
      let self = this;
      self.uploadTasks = [];
      self.filesResult = {};
      self.resultArr = [];
      self.progress = '0';
      self.fileName = '';
      self.filesToUpload = [];
      self.uploadFile[0].value = '';
    });


    this.filesToUpload = <Array<File>> fileInput.target.files;

    /*
     todo ran - for
     for (let i = 0; i < files.length; i++) {
     this.handleFileSelect(files[ i ], files.length);
     }*/

  }

  handleFileSelect(  ) {
    this.uploadModal.modal('show');


    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.uploadTasks.push(this.saveToStorage(this.filesToUpload[ i ]));
    }

    $.when.apply(null, this.uploadTasks).done(() => {
      let self = this;
      self.uploadModal.modal('hide');
      self.fileWasUploadModal.modal('show');
    });


  }

  saveToStorage( file ) {
    let self = this;
    let metadata = {
      lastModified: file.lastModified,
      name: file.name,
      size: file.size,
      type: file.type,
      webkitRelativePath: file.webkitRelativePath,
      origin: 'FE',
      reportType: this.selectedReport,
      propery: this.selectedProperty,
      companyID: localStorage.getItem('company')

    };


    //upload to our DB
    //this.uploadTask = this.storageRef.child(this.company + '/files/' + file.name)
    return new Promise(function ( resolve, reject ) {
      let selfTemp = self;
      selfTemp.storageRef.child(file.name)
        .put(file, metadata)
        .then(( res ) => {
          let md = metadata;
          let self = selfTemp;
          //as we move to google function we dont need to use firebase-queue
/*          self.databaseRef.push({'metadata': md})
            .then(() => {
              resolve();
            })
            .catch(( err ) => {
              console.log("error at saveToStorage databaseRef.push({'metadata': md}) " + err);
              console.error("error at saveToStorage databaseRef.push({'metadata': md})" + err);
              reject();
            });*/


        })
        .catch(( err ) => {
          console.log("error at saveToStorage storageRef.child " + err);
          console.error("error at saveToStorage storageRef.child" + err);
        });
    });


  };


  /*  beforeUpload(uploadingFile): void {
   let files = this._fileUpload.nativeElement.files;

   if (files.length) {
   const file = files[0];
   this._changePicture(file);

   if (!this._canUploadOnServer()) {
   uploadingFile.setAbort();
   } else {
   this.uploadInProgress = true;
   }
   }
   }

   bringFileSelector():boolean {
   this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
   return false;
   }

   removePicture():boolean {
   this.picture = '';
   return false;
   }

   _changePicture(file:File):void {
   const reader = new FileReader();
   reader.addEventListener('load', (event:Event) => {
   this.picture = (<any> event.target).result;
   }, false);
   reader.readAsDataURL(file);
   }

   _onUpload(data):void {
   if (data['done'] || data['abort'] || data['error']) {
   this._onUploadCompleted(data);
   } else {
   this.onUpload.emit(data);
   }
   }

   _onUploadCompleted(data):void {
   this.uploadInProgress = false;
   this.onUploadCompleted.emit(data);
   }

   _canUploadOnServer():boolean {
   return !!this.uploaderOptions['url'];
   }*/
}
