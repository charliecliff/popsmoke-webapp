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
import { HolidayProvider } from '../../providers/holiday-provider';
var HomePage = (function () {
    function HomePage(navCtrl, store, holidayProvider) {
        this.navCtrl = navCtrl;
        this.store = store;
        this.holidayProvider = holidayProvider;
        this.holidayProvider.getHolidays("army", "2020-01-01");
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select("holidays").subscribe(function (holidays) {
            _this.holidays = holidays;
        });
    };
    HomePage.prototype.holidaySelected = function (holiday) {
        console.log("Holiday Selected: " + JSON.stringify(holiday));
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [HolidayProvider]
    }),
    __metadata("design:paramtypes", [NavController,
        Store,
        HolidayProvider])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map