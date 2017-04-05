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
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/Rx';
import { AuthProvider } from './auth-provider';
import { User } from '../models/User';
import * as UserActions from '../reducers/user-reducer';
import * as UserIDActions from '../reducers/userID-reducer';
var UserProvider = (function () {
    function UserProvider(http, store, authProvider) {
        var _this = this;
        this.http = http;
        this.store = store;
        this.authProvider = authProvider;
        this.USER_NOT_FOUND = "USER_NOT_FOUND";
        this.baseUserUrl = "https://sleepy-scrubland-83197.herokuapp.com/user";
        this.getUserCallback = function (userID) {
            console.log("getUserCallback");
            var getUserURL = _this.baseUserUrl + "/" + userID;
            var headers = new Headers({ "Content-Type": "application/json" });
            _this.http.get(getUserURL, { headers: headers })
                .map(function (res) { return res.json(); })
                .map(_this.parseUserFromResponse)
                .subscribe(_this.updateUserStateCallback, _this.handleErrorCallback);
        };
        this.createUserCallback = function (userID) {
            var userURL = _this.baseUserUrl + "/" + userID;
            var headers = new Headers({ "Content-Type": "application/json" });
            var body = JSON.stringify({ "userID": userID });
            _this.http.post(userURL, body, { headers: headers })
                .map(function (res) { return res.json(); })
                .map(_this.parseUserFromResponse)
                .subscribe(_this.updateUserStateCallback, _this.handleErrorCallback);
        };
        this.handleErrorCallback = function (err) {
            console.log("handleErrorCallback");
            console.log('Error: %s', JSON.stringify(err));
        };
        this.updateAnonymousStateCallback = function () {
            _this.store.dispatch(new UserActions.SetUserAction(new User()));
            _this.store.dispatch(new UserIDActions.SetUserIDAction(""));
        };
        this.updateUserStateCallback = function (user) {
            _this.store.dispatch(new UserActions.SetUserAction(user));
            _this.store.dispatch(new UserIDActions.SetUserIDAction(user.userID));
        };
    }
    UserProvider.prototype.login = function (loginData) {
        console.log("login");
        this.authProvider.logIn(loginData)
            .subscribe(this.getUserCallback, this.handleErrorCallback);
    };
    UserProvider.prototype.logout = function () {
        console.log("logout");
        this.authProvider.logOut()
            .subscribe(this.updateAnonymousStateCallback, this.handleErrorCallback);
    };
    UserProvider.prototype.createAccount = function (newUserData) {
        console.log("createAccount");
        this.authProvider.createAccount(newUserData)
            .subscribe(this.createUserCallback, this.handleErrorCallback);
    };
    UserProvider.prototype.getUser = function (userID) {
        console.log("getUser");
        var getUserURL = this.baseUserUrl + "/" + userID;
        var headers = new Headers({ "Content-Type": "application/json" });
        this.http.get(getUserURL, { headers: headers })
            .map(function (res) { return res.json(); })
            .map(this.parseUserFromResponse)
            .subscribe(this.updateUserStateCallback, this.handleErrorCallback);
    };
    UserProvider.prototype.updateUser = function (user) {
        console.log("updateUser");
        var userURL = this.baseUserUrl + "/" + user.userID;
        var headers = new Headers({ "Content-Type": "application/json" });
        var body = JSON.stringify(user);
        return this.http.put(userURL, body, { headers: headers })
            .map(this.parseUserFromResponse);
    };
    UserProvider.prototype.parseUserFromResponse = function (json) {
        return new User(json["User"]);
    };
    return UserProvider;
}());
UserProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        Store,
        AuthProvider])
], UserProvider);
export { UserProvider };
//# sourceMappingURL=user-provider.js.map