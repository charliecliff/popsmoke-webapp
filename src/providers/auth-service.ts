import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/map';

import { AppState } from '../reducers';  
import * as userActions from '../actions/user.actions';

@Injectable()
export class AuthService {

  constructor(public http: Http, public angularFire: AngularFire, 
              public store: Store<AppState>) {

    this.angularFire.auth.subscribe(result => {
      if(result) {
        let action = new userActions.SetUserAction(result.auth.providerData);
        this.store.dispatch(action);
      }
      else {

      }
    });
  }

  logOut() {
    this.angularFire.auth.logout();
  }

  // USERNAME + PASSWORD PARADIGM 

  logIn(username, password) {
  	this.angularFire.auth.login({ email: username, password: password });
  }

  createUser(username, password) {

  }
}
