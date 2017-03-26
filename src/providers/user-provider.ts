import { Injectable } from '@angular/core';
import { Http,
         Headers, 
         Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState } from '../reducers';
import { User } from '../models/User';

@Injectable()
export class UserProvider {

  private USER_NOT_FOUND = "USER_NOT_FOUND";
  userUrl = "https://sleepy-scrubland-83197.herokuapp.com/user";

  constructor(public http: Http, public store: Store<AppState>) { 
    this.store.select("userID").subscribe(userID => {
      this.getUser(userID).subscribe(data => {
        console.log("subcribe closure");
      }, err => {
        if (err == 404) {
          console.log("404");
        }
        console.log(err);
      });
    });
  }

	getUser(userID): Observable<User> {
		let getUserURL = this.userUrl + "/" + userID;
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

  // private createUserForID(userID): Observable<User> {
  //   let headers = new Headers({"Content-Type": "application/json"});
  //   let user = new User();
  //   user.
  //   let body = JSON.stringify(user);
  //   return this.http.post(this.userUrl, body, {headers: headers})
  //                   .map(this.parseUserFromResponse)
  //                   .catch(this.handleError);
  // }

  private parseUserFromResponse(res: Response) {
    console.log("parse user");
    console.log(res);
    return new User();
  }

  private handleError(err) {
  	return Observable.throw(err["status"]);
  }
}
