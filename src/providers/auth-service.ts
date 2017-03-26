import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { AngularFire, AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { AppState } from '../reducers';  
import * as userIDReducer from '../reducers/userID-reducer';

@Injectable()
export class AuthService {

  constructor(public http: Http, 
              public angularFire: AngularFire, 
              public store: Store<AppState>) { }

  logOut() {
    this.angularFire.auth.logout()
                         .catch((error) => { console.log(error); });
  }

  // USERNAME + PASSWORD PARADIGM 

  logIn(creds) {
  	this.angularFire.auth.login(creds)
                         .catch((error) => { console.log(error); });
  }

  createAccount(creds): Observable<string> {
    var self = this;
    let promise = self.angularFire.auth.createUser(creds);;
    return Observable.fromPromise(<Promise<FirebaseAuthState>>promise)
                     .map(firebaseAuthState => {
                       return firebaseAuthState.uid;
                     });
  }
}
