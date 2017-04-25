import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonDigitKeyboard } from '../../third-party-components/ion-digit-keyboard/ion-digit-keyboard';
import * as Providers from '../../providers';
import * as Pages from '../../pages';

@Component({
  selector: 'page-pass-code',
  templateUrl: 'pass-code.html',
  providers: [Providers.UserProvider],
})
export class PassCodePage {

  public numberFieldMargin: number = 36;

  // PASS CODE STATE
  public passCode: string = "";
  public value1: string   = "";
  public value2: string   = "";
  public value3: string   = "";
  public value4: string   = "";
  public value5: string   = "";
  public value6: string   = "";
  public highlightField1 : boolean = true;
  public highlightField2 : boolean = false;
  public highlightField3 : boolean = false;
  public highlightField4 : boolean = false;
  public highlightField5 : boolean = false;
  public highlightField6 : boolean = false;

  public introMinHeight: number         = 1;
  public phoneNumberFieldHeight: number = 1;
  public visibleHeight: number          = 1;
  public keyboardHeight: number         = 1;

  constructor(public navCtrl: NavController,
              public authProvider: Providers.AuthProvider) { }

  private ngOnInit() {
    IonDigitKeyboard.show();

    this.adjustZoomLevel();
    IonDigitKeyboard.onClick.subscribe(this.didPressKeyCallback);
  }

  private onWindowResize(event): void {
    this.adjustZoomLevel();        
  }
  
  private adjustZoomLevel(): void {
    // this.phoneNumberFieldHeight = 60 + this.phoneNumberFieldMargin*2;
    let referenceHeight = 568; // iPhone 5
    let currentHeight = window.screen.height;
    let zoom = currentHeight / referenceHeight;
    this.keyboardHeight = 240*zoom;
    // this.visibleHeight = window.innerHeight - this.keyboardHeight;
    // this.introMinHeight = this.visibleHeight - this.phoneNumberFieldHeight;
  }

  private setPassCode(input: string): void {
    this.passCode = input;
    this.value1 = this.passCode.slice(0, 1);
    this.value2 = this.passCode.slice(1, 2);
    this.value3 = this.passCode.slice(2, 3);
    this.value4 = this.passCode.slice(3, 4);
    this.value5 = this.passCode.slice(4, 5);
    this.value6 = this.passCode.slice(5, 6);
    this.highlightField1 = (this.passCode.length == 0);
    this.highlightField2 = (this.passCode.length == 1);
    this.highlightField3 = (this.passCode.length == 2);
    this.highlightField4 = (this.passCode.length == 3);
    this.highlightField5 = (this.passCode.length == 4);
    this.highlightField6 = (this.passCode.length == 5);
  }

  private didPressKeyCallback = (key: any) => {
    if (key == "left") {
      let newNumber = this.passCode.slice(0, this.passCode.length - 1);
      this.setPassCode(newNumber);
      return;
    }
    if (key == "right") {
      this.loginWithPassCode();
      return;
    }
    if (this.passCode.length == 7) {
      return;
    }
    this.setPassCode(this.passCode += key);
  }

  private loginWithPassCode() {
    IonDigitKeyboard.hide();
    this.authProvider.login("9728961735", "4444");
    this.navCtrl.push(Pages.MainTabPage);
  }
}
