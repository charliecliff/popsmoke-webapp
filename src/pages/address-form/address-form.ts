import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StationFormPage } from '../station-form/station-form';

/*
  Generated class for the AddressForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-address-form',
  templateUrl: 'address-form.html'
})
export class AddressFormPage {

	PAGE_TITLE	: string					= "ADDRESS";
	SUBMIT_BUTTON_TITLE	: string	= "SUBMIT";

	STREET	: string	= "STREET"
	CITY	: string		= "CITY"
	STATE	: string		= "STATE"
	ZIP	: string			= "ZIP"
	
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressFormPage');
  }

  submit() {
    this.navCtrl.push(StationFormPage);
  }
}
