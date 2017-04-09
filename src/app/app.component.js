var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Store } from '@ngrx/store';
import * as menuReducer from '../reducers/menu-reducer';
import { UserProvider } from '../providers/user-provider';
import { HolidayProvider } from '../providers/holiday-provider';
import { PacketPage } from '../pages/packet/packet';
var MyApp = (function () {
    function MyApp(platform, store, userProvider, holidayProvider) {
        this.platform = platform;
        this.store = store;
        this.userProvider = userProvider;
        this.holidayProvider = holidayProvider;
        this.rootPage = PacketPage;
        platform.ready().then(function () {
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
    MyApp.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select("menu").subscribe(function (menu) {
            _this.menu = menu;
        });
    };
    MyApp.prototype.signOut = function () {
        this.userProvider.logout();
    };
    MyApp.prototype.selectMenuOption = function (option) {
        this.store.dispatch(new menuReducer.SelectMenuOptionAction(option.name));
    };
    return MyApp;
}());
__decorate([
    ViewChild('myNav'),
    __metadata("design:type", NavController)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html',
        providers: [UserProvider, HolidayProvider]
    }),
    __metadata("design:paramtypes", [Platform,
        Store,
        UserProvider,
        HolidayProvider])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map