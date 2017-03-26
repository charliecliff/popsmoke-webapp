import { Injectable, OnInit } from '@angular/core';
import { Http,
         Headers, 
         Response, 
         ResponseContentType, 
         RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState } from '../reducers';
import { User } from '../models/User';

@Injectable()
export class UserProvider {

  userUrl = "https://sleepy-scrubland-83197.herokuapp.com/user";

  constructor(public http: Http, public store: Store<AppState>) { 
    this.store.select("userID").subscribe(userID => {
      this.getUser(userID);
    });
  }

	getUser(userID): Observable<User> {
    console.log("get User");
		let getUserURL = this.userUrl + "/" + userID;
    console.log(getUserURL);
    let headers = new Headers({"Content-Type": "application/json"});
    return this.http.get(getUserURL, {headers: headers})
                    .map(this.parseUserFromResponse)
                    .catch(this.handleError);
  }

  updateUser(user): Observable<User> {
		let headers = new Headers({"Content-Type": "application/json"});
    let body = JSON.stringify(user);
    return this.http.put(this.userUrl, body, {headers: headers})
                    .map(this.parseUserFromResponse)
                    .catch(this.handleError);
  }

  createUser(user): Observable<User> {
    let headers = new Headers({"Content-Type": "application/json"});
    let body = JSON.stringify(user);
    return this.http.post(this.userUrl, body, {headers: headers})
                    .map(this.parseUserFromResponse)
                    .catch(this.handleError);
  }

  deleteUser(user): Observable<User> {
  	let deleteUserURL = this.userUrl + "/" + user["userID"];
    let headers = new Headers({"Content-Type": "application/json"});
    return this.http.delete(deleteUserURL, {headers: headers})
                    .map(this.parseUserFromResponse)
                    .catch(this.handleError);
  }

  private parseUserFromResponse(res: Response) {
    console.log("parse user");
    return new User();
  }

  private handleError(error) {
    console.log("user error");
  	return Observable.throw('Server error');
  }
}
