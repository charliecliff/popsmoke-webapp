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
export class AuthProvider {

  constructor(public http: Http, 
              public angularFire: AngularFire, 
              public store: Store<AppState>) { }

  logOut(): Observable<void> {
    let promise = this.angularFire.auth.logout();
    return Observable.fromPromise(<Promise<void>>promise);
  }

  // USERNAME + PASSWORD PARADIGM 

  logIn(creds): Observable<string> {
    var self = this;
    let promise = self.angularFire.auth.login(creds);
    return Observable.fromPromise(<Promise<FirebaseAuthState>>promise)
                     .map(firebaseAuthState => {
                       return firebaseAuthState.uid;
                     });
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
