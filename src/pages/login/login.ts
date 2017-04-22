import { Component } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonDigitKeyboard } from '../../third-party-components/ion-digit-keyboard/ion-digit-keyboard';
import { UserProvider } from '../../providers/user-provider';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserProvider],
  animations:[
    trigger('keyboardTrigger', [
      state('visible', style({ height: '*' })),
      state('hidden', style({ height: window.innerHeight - 120 })),
      transition('visible => hidden', animate('150ms ease-in-out')),
      transition('hidden => visible', animate('150ms ease-in-out'))
    ]),
    trigger('revealPhoneNumberTrigger', [
      state('visible', style({ opacity: 1, height: '*' })),
      state('hidden', style({ opacity: 0, height: 0})),
      transition('visible => hidden', animate('150ms ease-in-out')),
      transition('hidden => visible', animate('150ms ease-in-out'))
    ]),
    trigger('shrinkIntroTrigger', [
      state('fullSize', style({ height: '100%' })),
      state('compressedSize', style({ height: '*'})),
      transition('fullSize => compressedSize', animate('150ms ease-in-out')),
      transition('compressedSize => fullSize', animate('150ms ease-in-out'))
    ]),
    trigger('shrinkLogoTrigger', [
      state('fullSize', style({ 'max-height': 240, 'max-width': 240 })),
      state('compressedSize', style({ 'max-height': 60, 'max-width': 60 })),
      transition('fullSize => compressedSize', animate('150ms ease-in-out')),
      transition('compressedSize => fullSize', animate('150ms ease-in-out'))
    ]),
    trigger('shrinkTaglineTrigger', [
      state('fullSize', style({ opacity: 1, height: '*' })),
      state('compressedSize', style({ opacity: 0, height: 0})),
      transition('fullSize => compressedSize', animate('150ms ease-in-out')),
      transition('compressedSize => fullSize', animate('150ms ease-in-out'))
    ]),
    trigger('shrinkExplanationTrigger', [
      state('fullSize', style({ opacity: 1, height: '*' })),
      state('compressedSize', style({ opacity: 0, height: 0})),
      transition('fullSize => compressedSize', animate('150ms ease-in-out')),
      transition('compressedSize => fullSize', animate('150ms ease-in-out'))
    ]),
  ]
})
export class LoginPage {

  // STYLE CONSTANTS
  public tagline: string     = "Accelerate your Vacation";
  public explanation: string = "Login with your PHONE NUMBER";
  public phoneNumberFieldMargin: number = 36;

  public phoneNumber: string = "";
  public value1: string = "";
  public value2: string = "";
  public value3: string = "";
  public highlightFieldOne : boolean   = true;
  public highlightFieldTwo : boolean   = false;
  public highlightFieldThree : boolean = false;

  public introMinHeight: number         = 1;
  public phoneNumberFieldHeight: number = 1;
  public visibleHeight: number          = 1;
  public keyboardHeight: number         = 1;

  public keyboardState : string        = "hidden";
  public introSizeState : string       = "fullSize";
  public logoSizeState : string        = "fullSize";
  public taglineSizeState : string     = "fullSize";
  public explanationSizeState : string = "compressedSize";
  public phoneNumberState : string     = "hidden";

  constructor(public navCtrl: NavController,
              public userProvider: UserProvider) { }

  ngOnInit() {
    this.adjustZoomLevel();
    IonDigitKeyboard.onClick.subscribe(this.didPressKeyCallback);
  }

  onWindowResize(event): void {
    this.adjustZoomLevel();        
  }

  postPhoneNumber() {
    console.log('post Phone Number');
    this.userProvider.resetPassCodeForPhoneNumber(this.phoneNumber);
  }
  
  private showKeyboard() {
    IonDigitKeyboard.show();
    this.keyboardState        = 'visible';
    this.logoSizeState        = 'compressedSize';
    this.taglineSizeState     = 'compressedSize';
    this.explanationSizeState = 'fullSize';

    this.phoneNumberState = 'visible';
  }
  
  private keyboardShowAnimationDone(){
    if (this.keyboardState == 'visible') {

    }
  }

  private adjustZoomLevel(): void {
    this.phoneNumberFieldHeight = 60 + this.phoneNumberFieldMargin*2;
    let referenceHeight = 568; // iPhone 5
    let currentHeight = window.screen.height;
    let zoom = currentHeight / referenceHeight;
    this.keyboardHeight = 240*zoom;
    this.visibleHeight = window.innerHeight - this.keyboardHeight;
    this.introMinHeight = this.visibleHeight - this.phoneNumberFieldHeight;
  }

  private setPhoneNumber(input: string): void{
    this.phoneNumber = input;
    this.value1 = this.phoneNumber.slice(0, 3);
    this.value2 = this.phoneNumber.slice(3, 6);
    this.value3 = this.phoneNumber.slice(6);
    this.highlightFieldOne   = (this.phoneNumber.length < 3);
    this.highlightFieldTwo   = (this.phoneNumber.length >= 3 && 
                                this.phoneNumber.length < 6);
    this.highlightFieldThree = (this.phoneNumber.length >= 6 && 
                                this.phoneNumber.length < 10);
  }

  private didPressKeyCallback = (key: any) => {
    if (key == "left") {
      let newNumber = this.phoneNumber.slice(0, this.phoneNumber.length - 1);
      this.setPhoneNumber(newNumber);
      return;
    }
    if (key == "right") {
      this.postPhoneNumber();
      return;
    }
    if (this.phoneNumber.length == 10) {
      return;
    }
    this.setPhoneNumber(this.phoneNumber += key);
  }
}
