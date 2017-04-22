import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthProvider } from './auth-provider';
import { AppState } from '../reducers';
import { User } from '../models/User';
import * as UserActions from '../reducers/user-reducer';

@Injectable()
export class UserProvider {

  private USER_NOT_FOUND = "USER_NOT_FOUND";

  baseUserUrl = "https://sleepy-scrubland-83197.herokuapp.com/user";

  constructor(public http: Http, 
              public store: Store<AppState>,
              public authProvider: AuthProvider) { }

  resetPassCodeForPhoneNumber(phoneNumber) {
    console.log("resetPassCodeForPhoneNumber");
    let getUserURL = "https://sleepy-scrubland-83197.herokuapp.com" + "/auth/resetpasscode/" + phoneNumber;
    let headers = new Headers({"Content-Type": "application/json"});
    this.http.post(getUserURL, {headers: headers})
             .map((res:Response) => res.json())
             .subscribe();
  }

  login(loginData) {
    console.log("login");
    this.authProvider.logIn(loginData)
                     .subscribe(this.getUserCallback, 
                                this.handleErrorCallback);
  }

  logout() {
    console.log("logout");
    this.authProvider.logOut()
                     .subscribe(this.updateAnonymousStateCallback, 
                                this.handleErrorCallback);
  }

  createAccount(newUserData) {
    console.log("createAccount");
    this.authProvider.createAccount(newUserData)
                     .subscribe(this.createUserCallback, 
                                this.handleErrorCallback);
  }

	getUser(userID) {
    console.log("getUser");
		let getUserURL = this.baseUserUrl + "/" + userID;
    let headers = new Headers({"Content-Type": "application/json"});
    this.http.get(getUserURL, {headers: headers})
             .map((res:Response) => res.json())
             .map(this.parseUserFromResponse)
             .subscribe(this.updateUserStateCallback, 
                        this.handleErrorCallback);
  }

  // TODO:
  // updateUser(user): Observable<User> {
  //   console.log("updateUser");
  //   let userURL = this.baseUserUrl + "/" + user.userID;
		// let headers = new Headers({"Content-Type": "application/json"});
  //   let body = JSON.stringify(user);
  //   return this.http.put(userURL, body, {headers: headers})
  //                   .map(this.parseUserFromResponse)
  // }

  private getUserCallback = (userID) => {
    console.log("getUserCallback");
    let getUserURL = this.baseUserUrl + "/" + userID;
    let headers = new Headers({"Content-Type": "application/json"});
    this.http.get(getUserURL, {headers: headers})
             .map((res:Response) => res.json())
             .map(this.parseUserFromResponse)
             .subscribe(this.updateUserStateCallback, 
                        this.handleErrorCallback);
  }

  private createUserCallback = (userID) => {
    let userURL = this.baseUserUrl + "/" + userID;
    let headers = new Headers({"Content-Type": "application/json"});
    let body = JSON.stringify({"userID": userID});
    this.http.post(userURL, body, {headers: headers})
             .map((res:Response) => res.json())
             .map(this.parseUserFromResponse)
             .subscribe(this.updateUserStateCallback, 
                        this.handleErrorCallback);
  }

  private parseUserFromResponse(json) {
    return new User(json["User"]);
  }

  private handleErrorCallback = (err) => {
    console.log("handleErrorCallback");
    console.log('Error: %s', JSON.stringify(err)) ; 
  }

  private updateAnonymousStateCallback = () => {
    this.store.dispatch( new UserActions.SetUserAction( new User() ) );
  }

  private updateUserStateCallback = (user) => {
    this.store.dispatch( new UserActions.SetUserAction(user) );
  }
}
