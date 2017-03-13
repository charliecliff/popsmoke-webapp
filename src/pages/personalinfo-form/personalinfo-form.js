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
import { AddressFormPage } from '../address-form/address-form';
var PersonalInfoFormPage = (function () {
    function PersonalInfoFormPage(formBuilder, navCtrl, navParams, store, builderActions) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = store;
        this.builderActions = builderActions;
        this.PAGE_TITLE = "PERSONAL INFORMATION";
        this.SUBMIT_BUTTON_TITLE = "SUBMIT";
        this.first_name = "FIRST NAME";
        this.last_name = "LAST NAME";
        this.middle_initial = "MIDDLE INITIAL";
        this.ssn = "SSN";
        this.rank = "RANK";
        this.phone = "PHONE";
        this.personalInfoForm = formBuilder.group({
            firstName: [''],
            middleInitial: [''],
            lastName: [''],
            ssn: [''],
            rank: [''],
            phone: ['']
        });
    }
    PersonalInfoFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PersonalInfoFormPage');
    };
    PersonalInfoFormPage.prototype.dismiss = function () {
        this.navCtrl.popToRoot();
    };
    PersonalInfoFormPage.prototype.submit = function () {
        var personalInfo = {};
        personalInfo.firstName = this.personalInfoForm.value.firstName;
        personalInfo.lastName = this.personalInfoForm.value.lastName;
        personalInfo.middleInitial = this.personalInfoForm.value.middleInitial;
        personalInfo.ssn = this.personalInfoForm.value.ssn;
        personalInfo.rank = this.personalInfoForm.value.rank;
        personalInfo.phoneNumber = this.personalInfoForm.value.phoneNumber;
        this.store.dispatch(this.builderActions.addPersonalInfo(personalInfo));
        this.navCtrl.push(AddressFormPage);
    };
    return PersonalInfoFormPage;
}());
PersonalInfoFormPage = __decorate([
    Component({
        selector: 'page-personalinfo-form',
        templateUrl: 'personalinfo-form.html'
    }),
    __metadata("design:paramtypes", [FormBuilder,
        NavController,
        NavParams,
        Store,
        Da31BuilderActions])
], PersonalInfoFormPage);
export { PersonalInfoFormPage };
//# sourceMappingURL=personalinfo-form.js.map