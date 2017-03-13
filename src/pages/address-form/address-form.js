var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Da31BuilderActions } from '../../actions/da31builder.actions';
import { StationFormPage } from '../station-form/station-form';
var AddressFormPage = (function () {
    function AddressFormPage(formBuilder, navCtrl, navParams, store, builderActions) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = store;
        this.builderActions = builderActions;
        this.PAGE_TITLE = "ADDRESS";
        this.SUBMIT_BUTTON_TITLE = "SUBMIT";
        this.STREET = "STREET";
        this.CITY = "CITY";
        this.STATE = "STATE";
        this.ZIP = "ZIP";
        this.addressForm = formBuilder.group({
            street: [''],
            city: [''],
            state: [''],
            zip: ['']
        });
    }
    AddressFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddressFormPage');
    };
    AddressFormPage.prototype.dismiss = function () {
        this.navCtrl.popToRoot();
    };
    AddressFormPage.prototype.submit = function () {
        var address = {};
        address.street = this.addressForm.value.street;
        address.city = this.addressForm.value.city;
        address.state = this.addressForm.value.state;
        address.zip = this.addressForm.value.zip;
        this.store.dispatch(this.builderActions.addDestination(address));
        this.navCtrl.push(StationFormPage);
    };
    return AddressFormPage;
}());
AddressFormPage = __decorate([
    Component({
        selector: 'page-address-form',
        templateUrl: 'address-form.html'
    }),
    __metadata("design:paramtypes", [FormBuilder,
        NavController,
        NavParams,
        Store,
        Da31BuilderActions])
], AddressFormPage);
export { AddressFormPage };
//# sourceMappingURL=address-form.js.map