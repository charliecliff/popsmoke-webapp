import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as Reducers from '../../reducers';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService]
})
export class LoginPage {

  userSubscription;
  loginForm: FormGroup;
  registerCredentials = {email: '', password: ''};

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController,
              public store: Store<Reducers.AppState>, 
              public authService: AuthService) {
		this.loginForm = formBuilder.group({
        email: [''],
        password: ['']
		});
  }
  
  ngOnInit() {
    this.store.select('user').subscribe(user => {
      if(Object.keys(user).length !== 0) {
        this.navCtrl.popToRoot();
      }
    });
  }

  login() {
    let userName = this.registerCredentials.email;
    let password = this.registerCredentials.password;
    this.authService.logIn(userName, password);
  }
}
