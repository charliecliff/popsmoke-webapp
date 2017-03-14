import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { AppState } from '../../AppState';
import { Address } from '../../models/Address';
import { Da31BuilderActions } from '../../actions/da31builder.actions';   
import { StationFormPage } from '../station-form/station-form';

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
    private store: Store<AppState>,
    private builderActions: Da31BuilderActions) {
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
    
    this.store.dispatch(this.builderActions.addDestination(address));
    this.navCtrl.push(StationFormPage);
  }
}
