import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../AppState';  
import { PersonalInfo } from '../../models/PersonalInfo';
import { Da31Service } from '../../providers/da31.service';
import { Da31BuilderActions } from '../../actions/da31builder.actions';
import { AddressFormPage } from '../address-form/address-form';

@Component({
  selector: 'page-personalinfo-form',
  templateUrl: 'personalinfo-form.html',
  providers: [Da31Service]
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

  personalInfoForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder, 
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private store: Store<AppState>, 
    private builderActions: Da31BuilderActions,
    private da31Service: Da31Service) {
      this.personalInfoForm = formBuilder.group({
        firstName: [''],
        middleInitial: [''],
        lastName: [''],
        ssn: [''],
        rank: [''],
        phone: ['']
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInfoFormPage');
  }

  dismiss() {
    this.navCtrl.popToRoot();
  }

  submit() { 
    console.log("submit");
   
    // let personalInfo = {} as PersonalInfo;
    // personalInfo.firstName = this.personalInfoForm.value.firstName;
    // personalInfo.lastName = this.personalInfoForm.value.lastName;
    // personalInfo.middleInitial = this.personalInfoForm.value.middleInitial;
    // personalInfo.ssn = this.personalInfoForm.value.ssn;
    // personalInfo.rank = this.personalInfoForm.value.rank;
    // personalInfo.phoneNumber = this.personalInfoForm.value.phoneNumber;

    // this.store.dispatch(this.builderActions.addPersonalInfo(personalInfo));
    this.da31Service.postDa31FormData("test").subscribe(data => {

      console.log("fuck you");
      console.log(data);
      console.log("subcribe closure");
    });;
    // this.navCtrl.push(AddressFormPage);
  }
}
