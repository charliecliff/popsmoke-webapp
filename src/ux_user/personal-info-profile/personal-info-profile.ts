import {Component, trigger, state, style, transition, animate} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ModalController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import * as Constants from '../constants';

import { AppState } from '../../reducers';
import { User } from '../../models/User';
import { PersonalInfo } from '../../models/PersonalInfo';


import { StationProfilePage } from '../station-profile/station-profile';

@Component({
  selector: 'page-personal-info-profile',
  templateUrl: 'personal-info-profile.html',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class PersonalInfoProfilePage {



menuState:string = 'out';



  public updateButtonCopy = Constants.UPDATE_BUTTON;

	PAGE_TITLE	: string    = "PERSONAL INFORMATION";
	
	first_name: string			= "FIRST NAME";
	last_name: string				= "LAST NAME";
	middle_initial: string	= "MIDDLE INITIAL";
	ssn: string							= "SSN";
	rank: string						= "RANK";
	phone	: string					= "PHONE";

  // personalInfoForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, 
              private navCtrl: NavController, 
              private store: Store<AppState>,
              public modalCtrl: ModalController) {
    this.store.select("user").take(1)
                             .subscribe(this.initialUserCallback);
  }

  dismiss() {
    this.navCtrl.popToRoot();
  }

  submit() { 
    // let personalInfo = {} as PersonalInfo;
    // personalInfo.firstName = this.personalInfoForm.value.firstName;
    // personalInfo.lastName = this.personalInfoForm.value.lastName;
    // personalInfo.middleInitial = this.personalInfoForm.value.middleInitial;
    // personalInfo.ssn = this.personalInfoForm.value.ssn;
    // personalInfo.rank = this.personalInfoForm.value.rank;
    // personalInfo.phoneNumber = this.personalInfoForm.value.phoneNumber;
    // this.navCtrl.popToRoot();
  }

  selectProfileField()  {
    console.log("selectProfileField");
    this.menuState = this.menuState === 'out' ? 'in' : 'out';

     // let profileModal = this.modalCtrl.create(StationProfilePage);
     // profileModal.onDidDismiss(data => {
     //   console.log(data);
     // });
     // profileModal.present();
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