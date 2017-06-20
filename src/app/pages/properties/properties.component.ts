import { Component } from '@angular/core';

import 'style-loader!./properties.scss';
import { BaPropertiesDataModel } from "../../theme/services/baModel/BaPropertiesDataModel";
import { Route, ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'properties',
  templateUrl: './properties.html',
})
export class Properties {
  _data: any;
  _id : any;
  _obj : any;

  constructor( private _BaPropertiesModel: BaPropertiesDataModel ,
               private route: ActivatedRoute,
               private _router: Router){
  }

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        this._id = params[ 'id' ];
        this._data = this._BaPropertiesModel.getWebSitesData();
        for (let i = 0; i < this._data.length; i++) {
          if (this._data[i].title===this._id){
            this._obj = this._data[i].campaign;
          }
        }
      });
  }
}
