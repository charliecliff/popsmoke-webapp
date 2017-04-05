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
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
var StationProfilePage = (function () {
    function StationProfilePage(formBuilder, navCtrl, store) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.store = store;
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
        this.initialUserCallback = function (user) {
            var station = user.station;
            _this.stationForm = _this.formBuilder.group({
                platoon: [station.platoon],
                company: [station.company],
                battalion: [station.battalion],
                brigade: [station.brigade],
                division: [station.division],
                post: [station.post],
                zip: [station.zip],
                phone: [station.phoneNumber]
            });
        };
        this.store.select("user").take(1)
            .subscribe(this.initialUserCallback);
    }
    StationProfilePage.prototype.dismiss = function () {
        this.navCtrl.popToRoot();
    };
    StationProfilePage.prototype.submit = function () {
        var stationInfo = {};
        stationInfo.platoon = this.stationForm.value.platoon;
        stationInfo.company = this.stationForm.value.company;
        stationInfo.battalion = this.stationForm.value.battalion;
        stationInfo.brigade = this.stationForm.value.brigade;
        stationInfo.division = this.stationForm.value.division;
        stationInfo.post = this.stationForm.value.post;
        stationInfo.division = this.stationForm.value.division;
        this.navCtrl.popToRoot();
    };
    return StationProfilePage;
}());
StationProfilePage = __decorate([
    Component({
        selector: 'page-station-profile',
        templateUrl: 'station-profile.html'
    }),
    __metadata("design:paramtypes", [FormBuilder,
        NavController,
        Store])
], StationProfilePage);
export { StationProfilePage };
//# sourceMappingURL=station-profile.js.map