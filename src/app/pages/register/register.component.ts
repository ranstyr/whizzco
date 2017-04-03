import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';

import 'style-loader!./register.scss';
import { Http } from "@angular/http";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFire } from "angularfire2";
import { BaAuth } from "../../theme/services/baAuth/baAuth.service";
import { BaThemeSpinner } from "../../theme/services/baThemeSpinner/baThemeSpinner.service";

@Component({
  selector: 'register',
  templateUrl: './register.html',
})
export class Register {

  public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public company: AbstractControl;

  public repeatPassword: AbstractControl;
  public passwords: FormGroup;

  public submitted: boolean = false;

  private loginErrorMessage: string;
  private loginFlag: boolean;

  constructor( fb: FormBuilder, private _http: Http, public route: ActivatedRoute,
               public af: AngularFire, public _auth: BaAuth, public router: Router,
               private _spinner: BaThemeSpinner) {

    this.form = fb.group({
      'name': [ '', Validators.compose([ Validators.required ]) ],
      'email': [ '', Validators.compose([ Validators.required, EmailValidator.validate ]) ],
      'company': [ '', Validators.compose([ Validators.required ]) ],
      'passwords': fb.group({
        'password': [ '', Validators.compose([ Validators.required, Validators.minLength(6) ]) ],
        'repeatPassword': [ '', Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls[ 'name' ];
    this.email = this.form.controls[ 'email' ];
    this.company = this.form.controls[ 'company' ];
    this.passwords = <FormGroup> this.form.controls[ 'passwords' ];
    this.password = this.passwords.controls[ 'password' ];
    this.repeatPassword = this.passwords.controls[ 'repeatPassword' ];
  }

  public onSubmit( values: Object ): void {
    this.submitted = true;
    if (this.form.valid) {
      this.signUp();
    }
  }

  private signUp() {
    if (this.company.value && this.email.value && this.password.value) {
      this._spinner.show();
      this._auth.signup({email: this.email.value, password: this.password.value})
        .then(( val: any ) => {
          this._auth.setUserUid(val[ 'uid' ]);
          let userData = {};
          userData[ val[ 'uid' ] ] = {
            company: this.company.value,
            email: val.auth.email,
          };
          this._auth.setComapny(this.company.value);
          //todo ran - manage error of creating users database. we need to remmber that its not mandatory. currentyl only for company data
          const firebaseUsersObject = this.af.database.object(localStorage.getItem('company') + '/users')
            .update(userData)
            .catch(( err: Error ) => {
              console.error('error at login componenet , signup fucntion. Error Message:  ' + err.message + ' error stack: ' + err.stack)
            });
          this.router.navigate([ '/pages/dashboard' ])
        })
        .fail(( err ) => {
          let temp: any = {};
          if (typeof err === 'string') {
            temp.code = 300;
            temp.message = err;
            err = temp;
          };
          this._spinner.hide();
          console.log('error message: ' + err.message + '/n' + 'error code: ' + err.code);
          this.loginErrorMessage = err.message;
        });
    } else {
      this.loginErrorMessage = "You should enter a comapny name and credentials"
    }


  }
}
