import { Injectable } from '@angular/core';
import { Observable, } from "rxjs/Rx";
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Injectable()
export class UploadService {
  constructor(private _af: AngularFire) {
  }
}

