import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import * as Models from '../models';

@Injectable()
export class UserProvider {

  userUrl = "https://sleepy-scrubland-83197.herokuapp.com/user";

  constructor(public http: Http) { }

	getUser(user): Observable<User> {
		let getUserURL = this.userUrl + "/" + user["userID"];
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
    return new User();
  }

  private handleError(error) {
  	return Observable.throw('Server error');
  }
}
