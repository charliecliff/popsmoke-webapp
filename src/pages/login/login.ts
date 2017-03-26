import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user-provider';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserProvider]
})
export class LoginPage {

  loginForm: FormGroup;
  registerCredentials = {email: '', password: ''};

  constructor(public formBuilder: FormBuilder, 
              public navCtrl: NavController,
              public userProvider: UserProvider) {
		this.loginForm = formBuilder.group({
      email: [''],
      password: ['']
		});
  }

  login() {
    let email = this.registerCredentials.email;
    let password = this.registerCredentials.password;
    this.userProvider.login({"email": email, "password": password});
  }

  registerAccount() {
    let email = this.registerCredentials.email;
    let password = this.registerCredentials.password;
    this.userProvider.createAccount({"email": email, "password": password});    
  }
}
