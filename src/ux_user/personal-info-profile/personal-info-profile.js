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
import { NavController, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import * as Constants from '../constants';
import { User } from '../../models/User';
import { EditFieldPage } from '../../pages/edit-field/edit-field';
var PersonalInfoProfilePage = (function () {
    // personalInfoForm: FormGroup;
    function PersonalInfoProfilePage(navCtrl, alertCtrl, store) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.store = store;
        this.listState = 'visible';
        this.showsCloseIcon = false;
        this.updateButtonCopy = Constants.UPDATE_BUTTON;
        this.PAGE_TITLE = "PERSONAL INFORMATION";
        this.first_name = "FIRST NAME";
        this.last_name = "LAST NAME";
        this.middle_initial = "MIDDLE INITIAL";
        this.ssn = "SSN";
        this.rank = "RANK";
        this.phone = "PHONE";
        this.initialUserCallback = function (user) {
        };
        this.store.select("user").take(1)
            .subscribe(this.initialUserCallback);
    }
    PersonalInfoProfilePage.prototype.ionViewWillEnter = function () {
        this.listState = 'visible';
        this.showsCloseIcon = false;
    };
    PersonalInfoProfilePage.prototype.dismiss = function () {
        this.navCtrl.popToRoot();
    };
    PersonalInfoProfilePage.prototype.selectProfileField = function () {
        this.presentPrompt();
        // this.listState = this.listState === 'visible' ? 'hidden' : 'visible';
        // this.showsCloseIcon = true;
    };
    PersonalInfoProfilePage.prototype.animationDone = function () {
        if (this.listState == 'hidden') {
            this.navCtrl.push(EditFieldPage, {}, { animate: false });
        }
    };
    PersonalInfoProfilePage.prototype.presentPrompt = function () {
        var alert = this.alertCtrl.create({
            title: 'Login',
            inputs: [
                {
                    name: 'username',
                    placeholder: 'Username'
                },
                {
                    name: 'password',
                    placeholder: 'Password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Login',
                    handler: function (data) {
                        if (User.isValid(data.username, data.password)) {
                        }
                        else {
                            // invalid login
                            return false;
                        }
                    }
                }
            ]
        });
        alert.present();
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
        Store])
], PersonalInfoProfilePage);
export { PersonalInfoProfilePage };
//# sourceMappingURL=personal-info-profile.js.map