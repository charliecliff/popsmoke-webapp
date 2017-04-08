import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import * as Constants from '../constants';
import { AppState } from '../../reducers';
import { User } from '../../models/User';

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
        firstNameInput: ["", this.firstNameValidators()],
        middleInitialInput: ["", this.firstNameValidators()],
        lastNameInput: ["", this.firstNameValidators()],
        ssnInput: ["", this.firstNameValidators()],
        rankInput: ["", this.firstNameValidators()],
        phoneInput: ["", this.firstNameValidators()],
        stationPlatoonInput: ["", this.firstNameValidators()],
        stationCompanyInput: ["", this.firstNameValidators()],
        stationBattalionInput: ["", this.firstNameValidators()],
        stationBrigadeInput: ["", this.firstNameValidators()],
        stationDivisionInput: ["", this.firstNameValidators()],
        stationPostInput: ["", this.firstNameValidators()],
        stationZipInput: ["", this.firstNameValidators()],
        stationPhoneInput: ["", this.firstNameValidators()],
    });
  }

  ionViewWillEnter() {
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

  // Field Validators
  
  private firstNameValidators() {
    return Validators.compose([Validators.pattern('[a-zA-Z ]*'), 
                               Validators.required]);
  }
}