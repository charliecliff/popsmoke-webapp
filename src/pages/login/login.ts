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

  public visibleHeight: number = 1;
  public keyboardHeight: number = 1;

  // @ViewChild(Slides) slides: Slides;

  loginForm: FormGroup;
  registerCredentials = {email: '', password: ''};

  constructor(public formBuilder: FormBuilder, 
              public navCtrl: NavController,
              public userProvider: UserProvider) {
		this.loginForm = formBuilder.group({
      email: [''],
      password: ['']
		});

    this.adjustZoomLevel();

    IonDigitKeyboard.onClick.subscribe((key: any) => {
      
    });
  }

    ngOnInit() {
        this.adjustZoomLevel();
    }

    public onWindowResize(event): void {
        this.adjustZoomLevel();        
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

  private adjustZoomLevel(): void {
    let referenceHeight = 568; // iPhone 5
    let currentHeight = window.screen.height;
    let zoom = currentHeight / referenceHeight;
    this.keyboardHeight = 240*zoom;
    this.visibleHeight = window.innerHeight - this.keyboardHeight;
  }
}
