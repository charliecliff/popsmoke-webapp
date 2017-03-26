import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/map';

import { AppState } from '../reducers';  
import * as userIDReducer from '../reducers/userID-reducer';

@Injectable()
export class AuthService {

  constructor(public http: Http, 
              public angularFire: AngularFire, 
              public store: Store<AppState>) {

    this.angularFire.auth.subscribe(result => {
      if(result) {
        let action = new userIDReducer.SetUserIDAction({"userID": result.uid});
        this.store.dispatch(action);
      }
      else {

      }
    });
  }

  logOut() {
    this.angularFire.auth.logout()
                         .catch((error) => { console.log(error); });;
  }

  // USERNAME + PASSWORD PARADIGM 

  logIn(email, password) {
    let creds = { email: email, password: password };
  	this.angularFire.auth.login(creds)
                         .catch((error) => { console.log(error); });
  }

  createAccount(email, password) {
    let creds = { email: email, password: password };
    this.angularFire.auth.createUser(creds)
                         .catch((error) => { console.log(error); });
  }
}
