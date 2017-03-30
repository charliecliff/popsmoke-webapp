import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { AppState } from '../../reducers';
import { User } from '../../models/User';  
import { Station } from '../../models/Station';  

@Component({
  selector: 'page-station-profile',
  templateUrl: 'station-profile.html'
})
export class StationProfilePage {
	
	PAGE_TITLE	: string					= "STATION";
	SUBMIT_BUTTON_TITLE	: string	= "SUBMIT";

	PLATOON	: string		= "PLATOON";
	COMPANY	: string		= "COMPANY";
	BATTALION	: string	= "BATTALION";
	BRIGADE	: string		= "BRIGADE";
	DIVISION	: string	= "DIVISION";
	POST	: string			= "POST";
	ZIP	: string				= "POSTING ZIP";
	PHONE	: string			= "PHONE NO.";

  stationForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController, 
    private store: Store<AppState>) {
  	    this.store.select("user").take(1)
                             .subscribe(this.initialUserCallback);
  }

  dismiss() {
    this.navCtrl.popToRoot();
  }

  submit() {
    let stationInfo = {} as Station;
    stationInfo.platoon = this.stationForm.value.platoon;
    stationInfo.company = this.stationForm.value.company;
    stationInfo.battalion = this.stationForm.value.battalion;
    stationInfo.brigade = this.stationForm.value.brigade;
    stationInfo.division = this.stationForm.value.division;
    stationInfo.post = this.stationForm.value.post;
    stationInfo.division = this.stationForm.value.division;
    this.navCtrl.popToRoot();
	}

	private initialUserCallback = (user) => {
    var station = user.station;
    this.stationForm = this.formBuilder.group({
        platoon: [station.platoon],
        company: [station.company],
        battalion: [station.battalion],
        brigade: [station.brigade],
        division: [station.division],
        post: [station.post],
        zip: [station.zip],
        phone: [station.phoneNumber]
    });
  }
}