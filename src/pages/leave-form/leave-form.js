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
import { NavController, NavParams } from 'ionic-angular';
/*
  Generated class for the LeaveForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var LeaveFormPage = (function () {
    function LeaveFormPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.PAGE_TITLE = "LEAVE";
        this.SUBMIT_BUTTON_TITLE = "SUBMIT";
        this.ACCRUED_LEAVE = "ACCRUED";
        this.REQUESTED_LEAVE = "REQUESTED";
        this.ADVANCED_LEAVE = "ADVANCED";
        this.EXCESS_LEAVE = "EXCESS";
        this.LEAVE_DATE_FROM = "FROM";
        this.LEAVE_DATE_TO = "TO";
    }
    LeaveFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LeaveFormPage');
    };
    LeaveFormPage.prototype.submit = function () {
    };
    return LeaveFormPage;
}());
LeaveFormPage = __decorate([
    Component({
        selector: 'page-leave-form',
        templateUrl: 'leave-form.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], LeaveFormPage);
export { LeaveFormPage };
//# sourceMappingURL=leave-form.js.map