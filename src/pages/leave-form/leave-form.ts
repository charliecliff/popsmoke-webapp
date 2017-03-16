import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { AppState } from '../../reducers';  

@Component({
  selector: 'page-leave-form',
  templateUrl: 'leave-form.html'
})
export class LeaveFormPage {

	PAGE_TITLE	: string					= "LEAVE";
	SUBMIT_BUTTON_TITLE	: string	= "SUBMIT";

	ACCRUED_LEAVE	: string		= "ACCRUED";
	REQUESTED_LEAVE	: string	= "REQUESTED";
	ADVANCED_LEAVE	: string	= "ADVANCED";
	EXCESS_LEAVE	: string		= "EXCESS";
	LEAVE_DATE_FROM	: string	= "FROM";
	LEAVE_DATE_TO	: string		= "TO";

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController, 
    private navParams: NavParams,
    private store: Store<AppState>,) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveFormPage');
  }

  submit() {

    console.log("completedFormData");

    // this.da31Service.postDa31FormData("test").subscribe(data => {
    //   console.log("fuck you");
    //   console.log(data);
    //   console.log("subcribe closure");
    // });
  }
}
