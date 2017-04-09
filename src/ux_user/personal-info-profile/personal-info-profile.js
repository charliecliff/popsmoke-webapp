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
import { NavController, MenuController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { UserValidationProvider } from '../../providers/user-validation-provider';
var PersonalInfoProfilePage = (function () {
    function PersonalInfoProfilePage(navCtrl, menuCtrl, formBuilder, store, validations) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.formBuilder = formBuilder;
        this.store = store;
        this.validations = validations;
        this.showsCloseIcon = false;
        this.userCallback = function (user) {
            _this.firstName = user.personalInfo.firstName;
            _this.lastName = user.personalInfo.lastName;
            _this.middleInitial = user.personalInfo.middleInitial;
            _this.ssn = user.personalInfo.ssn;
            _this.rank = user.personalInfo.rank;
            _this.phone = user.personalInfo.phoneNumber;
            _this.stationPlatoon = user.station.platoon;
            _this.stationCompany = user.station.company;
            _this.stationBattalion = user.station.battalion;
            _this.stationBrigade = user.station.brigade;
            _this.stationDivision = user.station.division;
            _this.stationPost = user.station.post;
            _this.stationZip = user.station.zip;
            _this.stationPhone = user.station.phoneNumber;
        };
        this.store.select("user").take(1).subscribe(this.userCallback);
        this.userForm = formBuilder.group({
            firstNameInput: ["", this.validations.firstNameValidators()],
            middleInitialInput: ["", this.validations.firstNameValidators()],
            lastNameInput: ["", this.validations.firstNameValidators()],
            ssnInput: ["", this.validations.firstNameValidators()],
            rankInput: ["", this.validations.firstNameValidators()],
            phoneInput: ["", this.validations.firstNameValidators()],
            stationPlatoonInput: ["", this.validations.firstNameValidators()],
            stationCompanyInput: ["", this.validations.firstNameValidators()],
            stationBattalionInput: ["", this.validations.firstNameValidators()],
            stationBrigadeInput: ["", this.validations.firstNameValidators()],
            stationDivisionInput: ["", this.validations.firstNameValidators()],
            stationPostInput: ["", this.validations.firstNameValidators()],
            stationZipInput: ["", this.validations.firstNameValidators()],
            stationPhoneInput: ["", this.validations.firstNameValidators()],
        });
    }
    PersonalInfoProfilePage.prototype.ionViewWillEnter = function () {
        for (var i in this.userForm.controls) {
            this.userForm.controls[i].markAsTouched();
        }
        this.showsCloseIcon = false;
    };
    PersonalInfoProfilePage.prototype.onMenuIconClick = function () {
        if (!this.userForm.valid) {
        }
        else {
            this.menuCtrl.toggle();
        }
    };
    PersonalInfoProfilePage.prototype.sendProfileUpdates = function () {
    };
    PersonalInfoProfilePage.prototype.presentValidationErrorAlert = function () {
    };
    return PersonalInfoProfilePage;
}());
PersonalInfoProfilePage = __decorate([
    Component({
        selector: 'page-personal-info-profile',
        templateUrl: 'personal-info-profile.html'
    }),
    __metadata("design:paramtypes", [NavController,
        MenuController,
        FormBuilder,
        Store,
        UserValidationProvider])
], PersonalInfoProfilePage);
export { PersonalInfoProfilePage };
//# sourceMappingURL=personal-info-profile.js.map