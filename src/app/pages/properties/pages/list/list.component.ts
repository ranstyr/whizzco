import { Component} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import 'style-loader!./list.scss';
import { BaPropertiesModel } from "../../../../theme/services/model/BaPropertiesModel";

@Component({
  selector: 'list-component',
  templateUrl: 'list.html',
})

export class ListProperties {

  listData: LocalDataSource; // add a property to the component
  settings = {
    actions: false,
    delete: {
      confirmDelete: false
    },
    add: {
      confirmCreate: false
    },
    edit: {
      confirmSave: false
    },
    columns: {
      /*        id: {
       title: 'id',
       editable : false
       },*/
      /*        DateSourced: {
       title: 'DateSourced',
       editable : false
       },*/
      PropertyName: {
        title: 'Property Name',
        editable: false
      },
      Address: {
        title: 'Address',
        editable: false
      },
      /*        'Contact': {
       title: 'Contact',
       editable: true

       },*/
      State: {
        title: 'State',
        editable: false
      },
      Units: {
        title: 'Number of Units',
        editable: true
      },
      YearBuilt: {
        title: 'YearBuilt',
        editable: true
      },
      Type: {
        title: 'Type',
        editable: false
      },
      Equity: {
        title: 'Equity',
        editable: false,
        valuePrepareFunction: ( value ) => {
          return value ? ('$' + value.toLocaleString()) : value
        }
      },
      Sqft: {
        title: 'Square foot',
        editable: true
      },
      Comments: {
        title: 'Comments',
        editable: true
      }
      /*        PurchasePrice: {
       title: 'Purchase Price',
       editable: false,
       valuePrepareFunction: ( value ) => {
       return value ? ('$' + value.toLocaleString()) : value
       }

       },*/
      /*
       Debt: {
       title: 'Debt',
       editable: false,
       valuePrepareFunction: ( value ) => {
       return value ? ('$' + value.toLocaleString()) : value
       }

       },
       TotalCapital: {
       title: 'Total Capital',
       editable: false,
       valuePrepareFunction: ( value ) => {
       return value ? ('$' + value.toLocaleString()) : value
       }

       },
       DealIRR: {
       title: 'Deal IRR',
       editable: false,
       valuePrepareFunction: ( value ) => {
       return value ? (value.toLocaleString() * 100) + '%' : value
       }

       },
       SponsorEquity: {
       title: 'Sponsor Equity',
       editable: false,
       valuePrepareFunction: ( value ) => {
       return value ? ('$' + value.toLocaleString()) : value
       }

       }*/



      /*
       ,
       YearBuilt: {
       title: 'YearBuilt',
       editable : false
       }

       ,
       Occupancy: {
       title: 'Occupancy',
       editable : false
       }

       ,
       pricePerUnit: {
       title: 'pricePerUnit',
       editable : false
       }


       oneYearCapRate: {
       title: 'oneYearCapRate',
       editable : false
       }
       ,
       oneYearROE: {
       title: 'oneYearROE',
       editable : false
       }
       ,
       AvgROE: {
       title: 'AvgROE',
       editable : false
       }
       ,

       ,
       DealEquityMultiple: {
       title: 'DealEquityMultiple',
       editable : false
       },
       GoHardDate: {
       title: 'GoHardDate',
       editable : false
       }

       ,
       ClosingDateIncludingExtension: {
       title: 'ClosingDateIncludingExtension',
       editable : false
       }

       ,
       Comments: {
       title: 'Comments',
       editable : false
       }*/

    }
  };


  constructor(private _BaPropertiesModel : BaPropertiesModel) {
    this.listData = new LocalDataSource();
  }

  ngOnInit() {
    this._BaPropertiesModel.getDataObservable()
      .subscribe((value : any)=>{
        //LocalDataSource load the Properties data
        //_BaPropertiesModel.getData returns the data in the right format
        //this.listData.load asynch load for ng2-smart-table
        if(value.$exists()){
          this.listData.load(this._BaPropertiesModel.getData(value));
        }
      })
  }

  ngAfterViewInit() {
  }

  onDeleteConfirm( event ): void {
    alert("delete");
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm( event ): void {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData[ 'name' ] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm( event ): void {
    let key = event.newData.PropertyName.replace(/\s+/g, '');
    event.newData.dealID = key;
    let json = {};
    json[ key ] = event.newData;
    //this._PropertiesModel.setData(json);
    event.confirm.resolve(event.newData);
  }



}
