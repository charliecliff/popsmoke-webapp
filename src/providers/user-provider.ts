import { Injectable } from '@angular/core';
import { Http,
         Headers, 
         Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AppState } from '../reducers';
import { User } from '../models/User';
import { AuthService } from './auth-service';

@Injectable()
export class UserProvider {

  private USER_NOT_FOUND = "USER_NOT_FOUND";
  userUrl = "https://sleepy-scrubland-83197.herokuapp.com/user";

  constructor(public http: Http, 
              public store: Store<AppState>,
              public authService: AuthService) {

    // this.store.select("userID").subscribe(userID => {
    //   this.getUser(userID).subscribe( 
    //     function (user) { 
    //       console.log('Next: %s', user); 
    //     },
    //     function (err) { 
    //       console.log('Error: %s', err); 
    //     }
    //   );
    // });
  }

  login(loginData) {
    this.authService.logIn(loginData);
  }

  logout() {
    this.authService.logOut()
  }

  createAccount(newUserData) {
    var self = this;
    self.authService.createAccount(newUserData).subscribe(
        function (userID) { 
          console.log("userID");
          console.log(userID);
          self.createProfile(userID); 
        },
        function (err) { 
          console.log("create account subscribe");
          console.log('Error: %s', err); 
        }
     );
  }

	getUser(userID): Observable<User> {
		let getUserURL = this.userUrl + "/" + userID;
    let headers = new Headers({"Content-Type": "application/json"});
    return this.http.get(getUserURL, {headers: headers})
                    .map(this.parseUserFromResponse)
  }

  updateUser(user): Observable<User> {
		let headers = new Headers({"Content-Type": "application/json"});
    let body = JSON.stringify(user);
    return this.http.put(this.userUrl, body, {headers: headers})
                    .map(this.parseUserFromResponse)
  }

  createProfile(userID) {
    console.log("createProfile");
    let headers = new Headers({"Content-Type": "application/json"});
    let body = JSON.stringify({"userID": userID});
    return this.http.post(this.userUrl, body, {headers: headers})
                    .map(this.parseUserFromResponse)
                    .subscribe(
                      function (user) { console.log('User: %s', user);  },
                      function (err) { console.log('Error: %s', err); }
                    );
  }

  deleteUser(user): Observable<User> {
  	let deleteUserURL = this.userUrl + "/" + user["userID"];
    let headers = new Headers({"Content-Type": "application/json"});
    return this.http.delete(deleteUserURL, {headers: headers})
                    .map(this.parseUserFromResponse)
  }

  private parseUserFromResponse(res: Response) {
    return new User();
  }
}
