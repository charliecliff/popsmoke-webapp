import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LeaveFormPage } from '../leave-form/leave-form';

/*
  Generated class for the StationForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StationFormPage');
  }

  submit() {
    this.navCtrl.push(LeaveFormPage);
  }
}
