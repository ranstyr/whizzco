import { Injectable } from '@angular/core';
import { Observable, } from "rxjs/Rx";
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Injectable()
export class ListService {
  constructor(private _af: AngularFire) {
  }

  public getDataObservable(  ) : FirebaseObjectObservable<any>{
    return this._af.database.object(localStorage.getItem('company') + `/properties`);
  }
}

