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
import { PdfPage } from '../pdf/pdf';
import { Da31Service } from '../../providers/da31.service';
import * as da31BuilderActions from '../../actions/da31builder.actions';
var LeaveFormPage = (function () {
    function LeaveFormPage(formBuilder, navCtrl, store, da31Service) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.store = store;
        this.da31Service = da31Service;
        this.SUBMIT_BUTTON_TITLE = "SUBMIT";
        this.PAGE_TITLE = "LEAVE";
        this.ACCRUED_LEAVE = "ACCRUED";
        this.REQUESTED_LEAVE = "REQUESTED";
        this.ADVANCED_LEAVE = "ADVANCED";
        this.EXCESS_LEAVE = "EXCESS";
        this.LEAVE_DATE_FROM = "FROM";
        this.LEAVE_DATE_TO = "TO";
        this.TYPE_OF_LEAVE = "TYPE OF LEAVE";
        this.EXPLANATION_OF_TYPE_OF_LEAVE = "EXPLANATION";
        this.ORDINARY = "ORDINARY";
        this.EMERGENCY = "EMERGENCY";
        this.PERMISSIVE = "PERMISSIVE";
        this.TDY = "TDY";
        this.OTHER = "OTHER";
        this.leaveInfoFormGroup = formBuilder.group({
            leaveType: [""],
            explanationOfLeaveType: [""],
            accruedLeave: [""],
            requestedLeave: [""],
            advancedLeave: [""],
            excessLeave: [""],
            leaveDateFrom: [""],
            leaveDateTo: [""]
        });
        this.formSubscription = store.select('da31Form')
            .subscribe(function (da31Form) {
            _this.form = da31Form;
        });
    }
    LeaveFormPage.prototype.submit = function () {
        var leaveInfo = this.leaveInfoFormGroup.value;
        this.store.dispatch(new da31BuilderActions.AddPersonalInfoAction(leaveInfo));
        // TODO: This is CONTROLLER Level logic and should be pulled into a service
        this.da31Service.postDa31FormData(this.form).subscribe(function (data) {
            console.log("subcribe closure");
        });
        this.navCtrl.push(PdfPage);
    };
    return LeaveFormPage;
}());
LeaveFormPage = __decorate([
    Component({
        selector: 'page-leave-form',
        templateUrl: 'leave-form.html',
        providers: [Da31Service]
    }),
    __metadata("design:paramtypes", [FormBuilder,
        NavController,
        Store,
        Da31Service])
], LeaveFormPage);
export { LeaveFormPage };
//# sourceMappingURL=leave-form.js.map