import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { IonDigitKeyboard, IonDigitKeyboardOptions } from '../../third-party-components/ion-digit-keyboard/ion-digit-keyboard';

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


    IonDigitKeyboard.onClick.subscribe((key: any) => {
      console.log("fuck you");
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

  showKeyboard() {
    console.log("cdzvdsv");
    IonDigitKeyboard.show();
  }
}
