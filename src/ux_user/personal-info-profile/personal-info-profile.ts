import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import * as Constants from '../constants';
import * as PSValidators from '../../validators';

import { AppState } from '../../reducers';
import { User } from '../../models/User';
import { UserProvider } from '../../providers/user-provider';
import { UserValidationProvider } from '../../providers/user-validation-provider';

@Component({
  selector: 'page-personal-info-profile',
  templateUrl: 'personal-info-profile.html'
})
export class PersonalInfoProfilePage {

  showsCloseIcon:boolean = false;

  userForm: FormGroup;

  // User Values
  firstName : string;
  lastName : string;
  middleInitial : string;
  ssn : string;
  rank : string;
  phone	: string;
  stationPlatoon : string;
  stationCompany : string;
  stationBattalion : string;
  stationBrigade : string;
  stationDivision : string;
  stationPost : string;
  stationZip : string;
  stationPhone : string;
  
  constructor(private navCtrl: NavController,
              private menuCtrl: MenuController,
              private formBuilder: FormBuilder,
              private store: Store<AppState>) {
    
    this.store.select("user").take(1).subscribe(this.userCallback);

    this.userForm = formBuilder.group({
        firstNameInput: ["", PSValidators.firstNameValidators()],
        middleInitialInput: ["", PSValidators.firstNameValidators()],
        lastNameInput: ["", PSValidators.firstNameValidators()],
        ssnInput: ["", PSValidators.firstNameValidators()],
        rankInput: ["", PSValidators.firstNameValidators()],
        phoneInput: ["", PSValidators.firstNameValidators()],
        stationPlatoonInput: ["", PSValidators.firstNameValidators()],
        stationCompanyInput: ["", PSValidators.firstNameValidators()],
        stationBattalionInput: ["", PSValidators.firstNameValidators()],
        stationBrigadeInput: ["", PSValidators.firstNameValidators()],
        stationDivisionInput: ["", PSValidators.firstNameValidators()],
        stationPostInput: ["", PSValidators.firstNameValidators()],
        stationZipInput: ["", PSValidators.firstNameValidators()],
        stationPhoneInput: ["", PSValidators.firstNameValidators()],
    });
  }

  ionViewWillEnter() {
    for (var i in this.userForm.controls) {
      this.userForm.controls[i].markAsTouched();
    }
    this.showsCloseIcon = false;
  }

  onMenuIconClick() {
    if(!this.userForm.valid){
      // Handle Invalid User Profile

    } else {
      this.menuCtrl.toggle();
    }
  }

  private userCallback = (user) => {
    this.firstName = user.personalInfo.firstName;
    this.lastName = user.personalInfo.lastName;
    this.middleInitial = user.personalInfo.middleInitial;
    this.ssn = user.personalInfo.ssn;
    this.rank = user.personalInfo.rank;
    this.phone = user.personalInfo.phoneNumber;
    this.stationPlatoon = user.station.platoon;
    this.stationCompany = user.station.company;
    this.stationBattalion = user.station.battalion;
    this.stationBrigade = user.station.brigade;
    this.stationDivision = user.station.division;
    this.stationPost = user.station.post;
    this.stationZip = user.station.zip;   
    this.stationPhone = user.station.phoneNumber;
  }

  private sendProfileUpdates() {

  }
  
  private presentValidationErrorAlert() {

  }
}