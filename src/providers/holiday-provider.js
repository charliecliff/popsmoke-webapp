var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/Rx';
import * as HolidayActions from '../reducers/holidays-reducer';
var HolidayProvider = (function () {
    function HolidayProvider(http, store) {
        var _this = this;
        this.http = http;
        this.store = store;
        // TODO: Move this into a config file
        this.holidayUrl = "https://sleepy-scrubland-83197.herokuapp.com/holidays";
        this.updateHolidaysStateCallback = function (holidaysArray) {
            _this.store.dispatch(new HolidayActions.SetHolidaysAction(holidaysArray));
        };
        this.handleErrorCallback = function (err) {
            console.log("Holiday Error: " + JSON.stringify(err));
        };
        this.store.select("user").subscribe(function (user) {
            _this.getHolidays("army", "2020-01-01");
        });
    }
    HolidayProvider.prototype.getHolidays = function (branch, thruDate) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        var params = new URLSearchParams();
        params.set("branch", branch);
        params.set("thruDate", thruDate);
        options.search = params;
        this.http.get(this.holidayUrl, options)
            .map(function (res) { return res.json(); })
            .map(this.parseHolidaysFromResponse)
            .subscribe(this.updateHolidaysStateCallback, this.handleErrorCallback);
    };
    HolidayProvider.prototype.parseHolidaysFromResponse = function (res) {
        return res["holidays"];
    };
    return HolidayProvider;
}());
HolidayProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Store])
], HolidayProvider);
export { HolidayProvider };
//# sourceMappingURL=holiday-provider.js.map