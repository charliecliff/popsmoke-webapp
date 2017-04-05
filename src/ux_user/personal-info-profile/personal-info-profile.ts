import {Component, trigger, state, style, transition, animate} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import * as Constants from '../constants';

import { AppState } from '../../reducers';
import { User } from '../../models/User';
import { PersonalInfo } from '../../models/PersonalInfo';


import { StationProfilePage } from '../station-profile/station-profile';
import { EditFieldPage } from '../../pages/edit-field/edit-field';

@Component({
  selector: 'page-personal-info-profile',
  templateUrl: 'personal-info-profile.html',
  animations: [
    trigger('listState', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('400ms ease-in-out')),
      transition('hidden => visible', animate('400ms ease-in-out'))
    ])
  ]
})
export class PersonalInfoProfilePage {

  listState:string = 'visible';
  showsCloseIcon:boolean = false;

  public updateButtonCopy = Constants.UPDATE_BUTTON;

	PAGE_TITLE	: string    = "PERSONAL INFORMATION";
	
	first_name: string			= "FIRST NAME";
	last_name: string				= "LAST NAME";
	middle_initial: string	= "MIDDLE INITIAL";
	ssn: string							= "SSN";
	rank: string						= "RANK";
	phone	: string					= "PHONE";

  // personalInfoForm: FormGroup;
  
  constructor(private navCtrl: NavController,
              private alertCtrl: AlertController, 
              private store: Store<AppState>) {
    this.store.select("user").take(1)
                             .subscribe(this.initialUserCallback);
  }

  ionViewWillEnter() { // THERE IT IS!!!
    this.listState = 'visible';
    this.showsCloseIcon = false;
  }

  dismiss() {
    this.navCtrl.popToRoot();
  }

  selectProfileField()  {
    this.presentPrompt();
    // this.listState = this.listState === 'visible' ? 'hidden' : 'visible';
    // this.showsCloseIcon = true;
  }

  private animationDone(){
    if(this.listState == 'hidden') {
      this.navCtrl.push(EditFieldPage, { }, { animate: false });
    }
  }

  private initialUserCallback = (user) => {

  }

  
presentPrompt() {
  let alert = this.alertCtrl.create({
    title: 'Login',
    inputs: [
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Login',
        handler: data => {
          
        }
      }
    ]
  });
  alert.present();
}


}