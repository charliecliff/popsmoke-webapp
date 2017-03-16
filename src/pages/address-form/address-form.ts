import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { AppState } from '../../reducers';
import { Address } from '../../models/Address';
import { StationFormPage } from '../station-form/station-form';

import * as da31BuilderActions from '../../actions/da31builder.actions';

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
	
  addressForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController, 
    private navParams: NavParams,
    private store: Store<AppState>) {
      this.addressForm = formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressFormPage');
  }

  dismiss() {
    this.navCtrl.popToRoot();
  }

  submit() {
    
    let address = {} as Address;
    address.street = this.addressForm.value.street;
    address.city = this.addressForm.value.city;
    address.state = this.addressForm.value.state;
    address.zip = this.addressForm.value.zip;

    this.store.dispatch(new da31BuilderActions.AddDestinationAction(address));
    this.navCtrl.push(StationFormPage);
  }
}
