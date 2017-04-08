var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { EditFieldPage } from '../../pages/edit-field/edit-field';
var PersonalInfoProfilePage = (function () {
    function PersonalInfoProfilePage(navCtrl, alertCtrl, formBuilder, store) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.store = store;
        this.listState = 'visible';
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
        this.store.select("user").take(1)
            .subscribe(this.userCallback);
        this.userForm = formBuilder.group({
            firstNameInput: ["", this.firstNameValidators()]
        });
    }
    PersonalInfoProfilePage.prototype.ionViewWillEnter = function () {
        this.listState = 'visible';
        this.showsCloseIcon = false;
    };
    PersonalInfoProfilePage.prototype.dismiss = function () {
        this.navCtrl.popToRoot();
    };
    PersonalInfoProfilePage.prototype.selectProfileField = function () {
        // this.presentPrompt();
        // this.listState = this.listState === 'visible' ? 'hidden' : 'visible';
        // this.showsCloseIcon = true;
    };
    PersonalInfoProfilePage.prototype.animationDone = function () {
        if (this.listState == 'hidden') {
            this.navCtrl.push(EditFieldPage, {}, { animate: false });
        }
    };
    PersonalInfoProfilePage.prototype.firstNameValidators = function () {
        return Validators.compose([Validators.pattern('[a-zA-Z ]*'),
            Validators.required]);
    };
    return PersonalInfoProfilePage;
}());
PersonalInfoProfilePage = __decorate([
    Component({
        selector: 'page-personal-info-profile',
        templateUrl: 'personal-info-profile.html',
        animations: [
            trigger('listState', [
                state('visible', style({ opacity: 1 })),
                state('hidden', style({ opacity: 0 })),
                transition('visible => hidden', animate('400ms ease-in-out')),
                transition('hidden => visible', animate('400ms ease-in-out'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [NavController,
        AlertController,
        FormBuilder,
        Store])
], PersonalInfoProfilePage);
export { PersonalInfoProfilePage };
//# sourceMappingURL=personal-info-profile.js.map