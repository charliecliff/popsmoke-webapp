import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../AppState';  
import { Station } from '../../models/Station';  
import { Da31BuilderActions } from '../../actions/da31builder.actions';
import { LeaveFormPage } from '../leave-form/leave-form';

@Component({
  selector: 'page-station-form',
  templateUrl: 'station-form.html'
})
export class StationFormPage {
	
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
    private navParams: NavParams,
    private store: Store<AppState>, 
    private builderActions: Da31BuilderActions) {
      this.stationForm = formBuilder.group({
        platoon: [''],
        company: [''],
        battalion: [''],
        brigade: [''],
        division: [''],
        post: [''],
        zip: [''],
        phone: ['']
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StationFormPage');
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
    this.store.dispatch(this.builderActions.addStation(stationInfo));
    this.navCtrl.push(LeaveFormPage);
  }
}
