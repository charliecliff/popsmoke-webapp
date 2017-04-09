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
import { ValidationProvider } from '../../providers/validation-provider';
var PacketPage = (function () {
    function PacketPage(navCtrl, navParams, formBuilder, store, validations) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.store = store;
        this.validations = validations;
        var packetID = 1;
        this.store.select("user").subscribe(this.userCallback);
        this.bioFormConstructor();
        this.stationFormConstructor();
        this.destinationFormConstructor();
        this.leaveFormConstructor();
    }
    PacketPage.prototype.bioFormConstructor = function () {
        this.bioForm = this.formBuilder.group({
            firstNameInput: ["", this.validations.firstNameValidators()],
            middleInitialInput: ["", this.validations.firstNameValidators()],
            lastNameInput: ["", this.validations.firstNameValidators()],
            ssnInput: ["", this.validations.firstNameValidators()],
            rankInput: ["", this.validations.firstNameValidators()],
            phoneInput: ["", this.validations.firstNameValidators()],
        });
    };
    PacketPage.prototype.stationFormConstructor = function () {
        this.stationForm = this.formBuilder.group({
            stationPlatoonInput: ["", this.validations.firstNameValidators()],
            stationCompanyInput: ["", this.validations.firstNameValidators()],
            stationBattalionInput: ["", this.validations.firstNameValidators()],
            stationBrigadeInput: ["", this.validations.firstNameValidators()],
            stationDivisionInput: ["", this.validations.firstNameValidators()],
            stationPostInput: ["", this.validations.firstNameValidators()],
            stationZipInput: ["", this.validations.firstNameValidators()],
            stationPhoneInput: ["", this.validations.firstNameValidators()],
        });
    };
    PacketPage.prototype.destinationFormConstructor = function () {
        this.destinationForm = this.formBuilder.group({
            streetInput: [''],
            cityInput: [''],
            stateInput: [''],
            zipInput: ['']
        });
    };
    PacketPage.prototype.leaveFormConstructor = function () {
        this.leaveForm = this.formBuilder.group({
            leaveType: [""],
            explanationOfLeaveType: [""],
            accruedLeave: [""],
            requestedLeave: [""],
            advancedLeave: [""],
            excessLeave: [""],
            leaveDateFrom: [""],
            leaveDateTo: [""]
        });
    };
    return PacketPage;
}());
PacketPage = __decorate([
    Component({
        templateUrl: 'packet.html'
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        FormBuilder,
        Store,
        ValidationProvider])
], PacketPage);
export { PacketPage };
//# sourceMappingURL=packet.js.map