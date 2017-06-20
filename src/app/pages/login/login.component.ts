import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import 'style-loader!./login.scss';
import { BaAuth } from "../../theme/services/baAuth/baAuth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";
import { AngularFire } from "angularfire2";
import { BaThemeSpinner } from "../../theme/services/baThemeSpinner/baThemeSpinner.service";

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public company: AbstractControl;
  public submitted: boolean = false;
  private loginErrorMessage: string;
  private loginFlag: boolean;

  constructor( fb: FormBuilder, private _http: Http, public route: ActivatedRoute,
               public af: AngularFire, public _auth: BaAuth, public router: Router,
               private _spinner: BaThemeSpinner) {
    this.form = fb.group({
      'email': [ '', Validators.compose([ Validators.required ]) ],
      'password': [ '', Validators.compose([ Validators.required ]) ]});

    this.email = this.form.controls[ 'email' ];
    this.password = this.form.controls[ 'password' ];
    this.company = this.form.controls[ 'company' ];

    this.loginErrorMessage = '';
    this.loginFlag = true;

  }

  public onSubmit( values: Object ): void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      console.log(values);
      this.login();
    }
  }

  private login() {
    if ( this.email.value && this.password.value) {
      this._spinner.show();
      this._auth.login({email: this.email.value, password: this.password.value})
        .then(( val ) => {
          this.router.navigate([ '/pages/dashboard' ]);
        }).fail(( err ) => {
        let temp: any = {};
        if (typeof err === 'string') {
          temp.code = 300;
          temp.message = err;
          err = temp;
        };
        console.log('error message: ' + err.message + '/n' + 'error code: ' + err.code);
        this.loginErrorMessage = err.message;
        this._spinner.hide();
      });
    } else {
      this.loginErrorMessage = "You should enter a comapny name and credentials"
    }


  }
}
