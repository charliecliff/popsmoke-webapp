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
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { MainTabPage } from '../main-tab/main-tab';
var LaunchPage = (function () {
    function LaunchPage(navCtrl, store) {
        this.navCtrl = navCtrl;
        this.store = store;
    }
    LaunchPage.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select('user').subscribe(function (user) {
            _this.pushController(user);
        });
    };
    LaunchPage.prototype.pushController = function (user) {
        this.navCtrl.popToRoot();
        // if ( user.userID == undefined ) {
        //   this.navCtrl.push(LoginPage);
        // } else {
        this.navCtrl.push(MainTabPage);
        // }
    };
    return LaunchPage;
}());
LaunchPage = __decorate([
    Component({
        selector: 'page-launch',
        templateUrl: 'launch.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Store])
], LaunchPage);
export { LaunchPage };
//# sourceMappingURL=launch.js.map