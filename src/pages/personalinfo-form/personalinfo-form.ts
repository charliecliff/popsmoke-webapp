import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddressFormPage } from '../address-form/address-form';

/*
  Generated class for the PersonalinfoForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-personalinfo-form',
  templateUrl: 'personalinfo-form.html'
})
export class PersonalinfoFormPage {

	PAGE_TITLE	: string					= "PERSONAL INFORMATION";
	SUBMIT_BUTTON_TITLE	: string	= "SUBMIT";

	first_name: string			= "FIRST NAME";
	last_name: string				= "LAST NAME";
	middle_initial: string	= "MIDDLE INITIAL";
	ssn: string							= "SSN";
	rank: string						= "RANK";
	phone	: string					= "PHONE";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalinfoFormPage');
  }

  submit() {
    this.navCtrl.push(AddressFormPage);
  }
}
