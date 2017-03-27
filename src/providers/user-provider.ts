import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState } from '../reducers';
import { User } from '../models/User';
import { AuthService } from './auth-service';

@Injectable()
export class UserProvider {

  private USER_NOT_FOUND = "USER_NOT_FOUND";

  baseUserUrl = "https://sleepy-scrubland-83197.herokuapp.com/user";

  constructor(public http: Http, 
              public store: Store<AppState>,
              public authService: AuthService) { }

  login(loginData) {
    this.authService.logIn(loginData);
  }

  logout() {
    this.authService.logOut()
  }

  createAccount(newUserData) {
    var self = this;
    self.authService.createAccount(newUserData)
                    .subscribe(
                      function (userID) { 
                        self.createProfile(userID); 
                      },
                      function (err) { 
                        console.log("create account subscribe");
                        console.log('Error: %s', err); 
                      });
  }

	getUser(userID): Observable<User> {
		let getUserURL = this.baseUserUrl + "/" + userID;
    let headers = new Headers({"Content-Type": "application/json"});
    return this.http.get(getUserURL, {headers: headers})
                    .map(this.parseUserFromResponse)
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
                    .map(this.parseUserFromResponse)
  }

  private createProfile(userID) {
    var self = this;
    let userURL = this.baseUserUrl + "/" + userID;
    let headers = new Headers({"Content-Type": "application/json"});
    let body = JSON.stringify({"userID": userID});
    return self.http.post(userURL, body, {headers: headers})
                    .map((res:Response) => res.json())
                    .map(self.parseUserFromResponse)
                    .subscribe(
                      function (user) {

                        console.log('User: %s', user);

                      },
                      function (err) { 
                        console.log('Error: %s', err); 
                      });
  }

  private parseUserFromResponse(responseJSON) {
    console.log("respsonse\n" + JSON.stringify(responseJSON));
    return new User();
  }
}
