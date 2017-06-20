import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { API_URLS } from './constants.service';
import * as _ from 'lodash';
import { AngularFire } from 'angularfire2';
import { Router } from "@angular/router";



@Injectable()
export class BaAuth {
  public redirectUrl: string;

  private deferred: JQueryDeferred<any>;
  private localStorage: Storage;
  private _token: String;
  private _auth: any;
  private _uid: string;
  private _company: string;
  // store the URL so we can redirect after logging in

  constructor( private _http: Http, public af: AngularFire, public router: Router ) {
    console.log("auth service constructor");
  }

  /**
   * login via firebase auth
   * @constructor
   * @param {credentials} credentials.email & credentials.password according to user input
   */

  login( credentials ) {
    let deferred = $.Deferred();
    let self = this;


    this.af.auth.login({email: credentials.email, password: credentials.password})
      .then(( result ) => {
        // success
        self.setUserUid(result.uid);
      })
      .catch(( err ) => {
        console.log(err);
        deferred.reject(err);
      });

    return deferred;
  }

  signOut() {
    this.af.auth.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('company');
    localStorage.removeItem('uid');
    this.router.navigate([ '/login' ]);

  }

  /**
   * login via future API module ($auth0 / JWT)
   * @constructor
   * @param {credentials} credentials.email & credentials.password according to user input
   */

  /**
   * login via firebase auth
   * @constructor
   * @param {credentials} credentials.email & credentials.password according to user input
   */


  signup( credentials ) {
    let deferred = $.Deferred();

    this.af.auth.createUser({email: credentials.email, password: credentials.password})
      .then(( result ) => {
        this.setUserUid(result.uid);
        deferred.resolve(result);
      })
      .catch(( error ) => {
        // Handle Errors here.
        console.log(error);
        deferred.reject(error);
      });


    return deferred;
  }

  /**
   * setup Token for App accoridng to login user
   * @constructor
   * @param {token} uid receive from current firebase auth service.currently store in local storage
   */

  setToken( token ) {
    localStorage.setItem('token', token || {});
    this._token = localStorage.getItem('token');
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  isUserLoggedIn() {
    firebase.auth().onAuthStateChanged(function ( user ) {
      if (user) {
        // User is signed in.
        return user;
      } else {
        // No user is signed in.
        return null;
      }
    });
  }

  getAuth() {
    this._auth = firebase.auth();
    return this._auth;
  }

  setUserUid( uid ) {
    localStorage.setItem('uid', uid || {});
    this._uid = localStorage.getItem('uid');
  }

  getUserUid() {
    return localStorage.getItem('uid');
  }

  setComapny( company ) {
    localStorage.setItem('company', company || {});
    this._company = localStorage.getItem('company');
  }

  getComapny() {
    return localStorage.getItem('company');
  }

  private handleError( error: Response ) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }

}
