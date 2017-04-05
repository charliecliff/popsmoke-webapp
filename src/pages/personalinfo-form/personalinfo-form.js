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
import { AddressFormPage } from '../address-form/address-form';
import * as da31BuilderActions from '../../actions/da31builder.actions';
var PersonalInfoFormPage = (function () {
    function PersonalInfoFormPage(formBuilder, navCtrl, navParams, store) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = store;
        this.PAGE_TITLE = "PERSONAL INFORMATION";
        this.SUBMIT_BUTTON_TITLE = "SUBMIT";
        this.first_name = "FIRST NAME";
        this.last_name = "LAST NAME";
        this.middle_initial = "MIDDLE INITIAL";
        this.ssn = "SSN";
        this.rank = "RANK";
        this.phone = "PHONE";
        this.initialUserCallback = function (user) {
            var personalInfo = user.personalInfo;
            _this.personalInfoForm = _this.formBuilder.group({
                firstName: [personalInfo.firstName],
                middleInitial: [personalInfo.middleInitial],
                lastName: [personalInfo.lastName],
                ssn: [personalInfo.ssn],
                rank: [personalInfo.rank],
                phone: [personalInfo.phone]
            });
        };
        this.store.select("user").take(1)
            .subscribe(this.initialUserCallback);
    }
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
        this.store.dispatch(new da31BuilderActions.AddPersonalInfoAction(personalInfo));
        this.navCtrl.push(AddressFormPage);
    };
    return PersonalInfoFormPage;
}());
PersonalInfoFormPage = __decorate([
    Component({
        selector: 'page-personalinfo-form',
        templateUrl: 'personalinfo-form.html',
    }),
    __metadata("design:paramtypes", [FormBuilder,
        NavController,
        NavParams,
        Store])
], PersonalInfoFormPage);
export { PersonalInfoFormPage };
//# sourceMappingURL=personalinfo-form.js.map