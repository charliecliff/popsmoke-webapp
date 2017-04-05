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
import { UserProvider } from '../../providers/user-provider';
var LoginPage = (function () {
    function LoginPage(formBuilder, navCtrl, userProvider) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.userProvider = userProvider;
        this.registerCredentials = { email: '', password: '' };
        this.loginForm = formBuilder.group({
            email: [''],
            password: ['']
        });
    }
    LoginPage.prototype.login = function () {
        var email = this.registerCredentials.email;
        var password = this.registerCredentials.password;
        this.userProvider.login({ "email": email, "password": password });
    };
    LoginPage.prototype.registerAccount = function () {
        var email = this.registerCredentials.email;
        var password = this.registerCredentials.password;
        this.userProvider.createAccount({ "email": email, "password": password });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
        providers: [UserProvider]
    }),
    __metadata("design:paramtypes", [FormBuilder,
        NavController,
        UserProvider])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map