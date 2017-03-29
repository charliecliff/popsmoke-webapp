import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import * as Constants from '../constants';

import { AppState } from '../../reducers';
import { User } from '../../models/User';
import { PersonalInfo } from '../../models/PersonalInfo';

@Component({
  selector: 'page-personal-info-profile',
  templateUrl: 'personal-info-profile.html'
})
export class PersonalInfoProfilePage {

  public updateButtonCopy = Constants.UPDATE_BUTTON;

	PAGE_TITLE	: string					= "PERSONAL INFORMATION";
	
	first_name: string			= "FIRST NAME";
	last_name: string				= "LAST NAME";
	middle_initial: string	= "MIDDLE INITIAL";
	ssn: string							= "SSN";
	rank: string						= "RANK";
	phone	: string					= "PHONE";

  personalInfoForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, 
              private navCtrl: NavController, 
              private store: Store<AppState>) {
    this.store.select("user").take(1)
                             .subscribe(this.initialUserCallback);
  }

  dismiss() {
    this.navCtrl.popToRoot();
  }

  submit() { 
    let personalInfo = {} as PersonalInfo;
    personalInfo.firstName = this.personalInfoForm.value.firstName;
    personalInfo.lastName = this.personalInfoForm.value.lastName;
    personalInfo.middleInitial = this.personalInfoForm.value.middleInitial;
    personalInfo.ssn = this.personalInfoForm.value.ssn;
    personalInfo.rank = this.personalInfoForm.value.rank;
    personalInfo.phoneNumber = this.personalInfoForm.value.phoneNumber;
    this.navCtrl.popToRoot();
  }

  private initialUserCallback = (user) => {
    var personalInfo = user.personalInfo;
    this.personalInfoForm = this.formBuilder.group({
      firstName: [personalInfo.firstName],
      middleInitial: [personalInfo.middleInitial],
      lastName: [personalInfo.lastName],
      ssn: [personalInfo.ssn],
      rank: [personalInfo.rank],
      phone: [personalInfo.phone]
    });
  }
}