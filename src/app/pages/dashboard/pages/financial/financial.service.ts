import { Injectable } from '@angular/core';
import { Observable , } from "rxjs/Rx";

@Injectable()
export class FinancialService {
  constructor() { }

  getData() {
/*    return this.http
      .get('api/characters.json')
      .map((response: Response) => response.json().data);*/

    /* Using a function */
    return Observable.create(function ( observer) {
      observer.onNext(42);
      observer.onCompleted();

      // Note that this is optional, you do not have to return this if you require no cleanup
      return function () {
        console.log('disposed');
      };
    });
  }
}

