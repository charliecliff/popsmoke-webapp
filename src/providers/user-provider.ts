import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState } from '../reducers';
import { User } from '../models/User';
import { AuthService } from './auth-service';

import * as UserActions from '../reducers/user-reducer';
import * as UserIDActions from '../reducers/userID-reducer';

@Injectable()
export class UserProvider {

  private USER_NOT_FOUND = "USER_NOT_FOUND";

  baseUserUrl = "https://sleepy-scrubland-83197.herokuapp.com/user";

  constructor(public http: Http, 
              public store: Store<AppState>,
              public authService: AuthService) { }

  login(loginData) {
    var self = this;
    self.authService.logIn(loginData)
                    .subscribe(function (userID) { self.getUser(userID); }, 
                               this.handleErrorCallback);
  }

  logout() {
    this.authService.logOut()
  }

  createAccount(newUserData) {
    var self = this;
    self.authService.createAccount(newUserData)
                    .subscribe(this.createProfile, this.handleErrorCallback);
  }

	getUser(userID) {
		let getUserURL = this.baseUserUrl + "/" + userID;
    let headers = new Headers({"Content-Type": "application/json"});
    this.http.get(getUserURL, {headers: headers})
             .map((res:Response) => res.json())
             .map(this.parseUserFromResponse)
             .subscribe(this.updateUserStateCallback, this.handleErrorCallback);
  }

  updateUser(user): Observable<User> {
    let userURL = this.baseUserUrl + "/" + user.userID;
		let headers = new Headers({"Content-Type": "application/json"});
    let body = JSON.stringify(user);
    return this.http.put(userURL, body, {headers: headers})
                    .map(this.parseUserFromResponse)
  }
  
  deleteUser(user): Observable<User> {
    let userURL = this.baseUserUrl + "/" + user.userID;
    let headers = new Headers({"Content-Type": "application/json"});
    return this.http.delete(userURL, {headers: headers})
                    .map((res:Response) => res.json())
                    .map(this.parseUserFromResponse)
  }

  private createProfile = (userID) => {
    let userURL = this.baseUserUrl + "/" + userID;
    let headers = new Headers({"Content-Type": "application/json"});
    let body = JSON.stringify({"userID": userID});
    this.http.post(userURL, body, {headers: headers})
             .map((res:Response) => res.json())
             .map(this.parseUserFromResponse)
             .subscribe(this.updateUserStateCallback, this.handleErrorCallback);
  }

  private parseUserFromResponse(responseJSON) {
    console.log("parseUserFromResponse\n" + JSON.stringify(responseJSON) + "\n");
    return new User(responseJSON["User"]);
  }

  private handleErrorCallback = (err) => {
    console.log("handleErrorCallback");
    console.log('Error: %s', JSON.stringify(err)) ; 
  }

  private updateUserStateCallback = (user) => {
    console.log('Update User: %s', user);
    this.store.dispatch( new UserActions.SetUserAction(user) );
    this.store.dispatch( new UserIDActions.SetUserIDAction(user.userID) );
  }
}
