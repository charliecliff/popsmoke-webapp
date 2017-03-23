import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService]
})
export class LoginPage {

  loginForm: FormGroup;
  registerCredentials = {email: '', password: ''};

  constructor(public formBuilder: FormBuilder, 
              public navCtrl: NavController,
              public authService: AuthService) {
		this.loginForm = formBuilder.group({
      email: [''],
      password: ['']
		});
  }

  login() {
    let email = this.registerCredentials.email;
    let password = this.registerCredentials.password;
    this.authService.logIn(email, password);
  }

  registerAccount() {
    let email = this.registerCredentials.email;
    let password = this.registerCredentials.password;
    this.authService.createAccount(email, password);    
  }
}
