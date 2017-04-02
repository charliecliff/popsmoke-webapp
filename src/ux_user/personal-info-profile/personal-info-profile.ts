import {Component, trigger, state, style, transition, animate} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
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
    trigger('slideInOut', [
      state('in', style({
        transform: 'scaleY( 20 )'
      })),
      state('out', style({
        transform: 'scaleY( 1 )'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('listState', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('400ms ease-in-out')),
      transition('hidden => visible', animate('400ms ease-in-out'))
    ])
  ]
})
export class PersonalInfoProfilePage {



  menuState:string = 'out';
  listState:string = 'visible';



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
              private store: Store<AppState>) {
    this.store.select("user").take(1)
                             .subscribe(this.initialUserCallback);
  }

  ionViewWillEnter() { // THERE IT IS!!!
    this.listState = 'visible';
  }

  dismiss() {
    this.navCtrl.popToRoot();
  }

  selectProfileField()  {
    this.listState = this.listState === 'visible' ? 'hidden' : 'visible';
  }

  private animationDone(){
    if(this.listState == 'hidden') {
      this.navCtrl.push(EditFieldPage, { }, { animate: false });
    }
  }

  private initialUserCallback = (user) => {
    // var personalInfo = user.personalInfo;
    // this.personalInfoForm = this.formBuilder.group({
    //   firstName: [personalInfo.firstName],
    //   middleInitial: [personalInfo.middleInitial],
    //   lastName: [personalInfo.lastName],
    //   ssn: [personalInfo.ssn],
    //   rank: [personalInfo.rank],
    //   phone: [personalInfo.phone]
    // });
  }
}