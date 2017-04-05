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
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
var AuthProvider = (function () {
    function AuthProvider(http, angularFire, store) {
        this.http = http;
        this.angularFire = angularFire;
        this.store = store;
    }
    AuthProvider.prototype.logOut = function () {
        var promise = this.angularFire.auth.logout();
        return Observable.fromPromise(promise);
    };
    // USERNAME + PASSWORD PARADIGM 
    AuthProvider.prototype.logIn = function (creds) {
        var self = this;
        var promise = self.angularFire.auth.login(creds);
        return Observable.fromPromise(promise)
            .map(function (firebaseAuthState) {
            return firebaseAuthState.uid;
        });
    };
    AuthProvider.prototype.createAccount = function (creds) {
        var self = this;
        var promise = self.angularFire.auth.createUser(creds);
        ;
        return Observable.fromPromise(promise)
            .map(function (firebaseAuthState) {
            return firebaseAuthState.uid;
        });
    };
    return AuthProvider;
}());
AuthProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        AngularFire,
        Store])
], AuthProvider);
export { AuthProvider };
//# sourceMappingURL=auth-provider.js.map