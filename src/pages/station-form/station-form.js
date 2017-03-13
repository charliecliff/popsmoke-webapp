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
import { LeaveFormPage } from '../leave-form/leave-form';
var StationFormPage = (function () {
    function StationFormPage(formBuilder, navCtrl, navParams, store, builderActions) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = store;
        this.builderActions = builderActions;
        this.PAGE_TITLE = "STATION";
        this.SUBMIT_BUTTON_TITLE = "SUBMIT";
        this.PLATOON = "PLATOON";
        this.COMPANY = "COMPANY";
        this.BATTALION = "BATTALION";
        this.BRIGADE = "BRIGADE";
        this.DIVISION = "DIVISION";
        this.POST = "POST";
        this.ZIP = "POSTING ZIP";
        this.PHONE = "PHONE NO.";
        this.stationForm = formBuilder.group({
            platoon: [''],
            company: [''],
            battalion: [''],
            brigade: [''],
            division: [''],
            post: [''],
            zip: [''],
            phone: ['']
        });
    }
    StationFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StationFormPage');
    };
    StationFormPage.prototype.dismiss = function () {
        this.navCtrl.popToRoot();
    };
    StationFormPage.prototype.submit = function () {
        var stationInfo = {};
        stationInfo.platoon = this.stationForm.value.platoon;
        stationInfo.company = this.stationForm.value.company;
        stationInfo.battalion = this.stationForm.value.battalion;
        stationInfo.brigade = this.stationForm.value.brigade;
        stationInfo.division = this.stationForm.value.division;
        stationInfo.post = this.stationForm.value.post;
        stationInfo.division = this.stationForm.value.division;
        this.store.dispatch(this.builderActions.addStation(stationInfo));
        this.navCtrl.push(LeaveFormPage);
    };
    return StationFormPage;
}());
StationFormPage = __decorate([
    Component({
        selector: 'page-station-form',
        templateUrl: 'station-form.html'
    }),
    __metadata("design:paramtypes", [FormBuilder,
        NavController,
        NavParams,
        Store,
        Da31BuilderActions])
], StationFormPage);
export { StationFormPage };
//# sourceMappingURL=station-form.js.map