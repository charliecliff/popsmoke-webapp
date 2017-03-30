import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppState } from '../../reducers';
import { User } from '../../models/User';
import { PersonalInfo } from '../../models/PersonalInfo';
import { AddressFormPage } from '../address-form/address-form';
import * as da31BuilderActions from '../../actions/da31builder.actions';

@Component({
  selector: 'page-personalinfo-form',
  templateUrl: 'personalinfo-form.html',
})
export class PersonalInfoFormPage {

	PAGE_TITLE	: string					= "PERSONAL INFORMATION";
	SUBMIT_BUTTON_TITLE	: string	= "SUBMIT";

	first_name: string			= "FIRST NAME";
	last_name: string				= "LAST NAME";
	middle_initial: string	= "MIDDLE INITIAL";
	ssn: string							= "SSN";
	rank: string						= "RANK";
	phone	: string					= "PHONE";

  intitialPersonalInfo: PersonalInfo;
  personalInfoForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, 
              private navCtrl: NavController, 
              private navParams: NavParams,
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

    this.store.dispatch(new da31BuilderActions.AddPersonalInfoAction(personalInfo));
    this.navCtrl.push(AddressFormPage);
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
