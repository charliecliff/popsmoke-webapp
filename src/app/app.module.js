var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
// 
import { MyApp } from './app.component';
// Pages
import { PacketPage } from '../pages/packet/packet';
import { PersonalInfoFormPage } from '../pages/personalinfo-form/personalinfo-form';
import { AddressFormPage } from '../pages/address-form/address-form';
import { StationFormPage } from '../pages/station-form/station-form';
import { LeaveFormPage } from '../pages/leave-form/leave-form';
import { PdfPage } from '../pages/pdf/pdf';
import { LaunchPage } from '../pages/launch/launch';
import { LoginPage } from '../pages/login/login';
import { MainTabPage } from '../pages/main-tab/main-tab';
import { PersonalInfoProfilePage } from '../ux_user/personal-info-profile/personal-info-profile';
import { DocumentsPage } from '../pages/documents/documents';
import { HomePage } from '../pages/home/home';
import { PacketHistoryPage } from '../pages/packet-history/packet-history';
import { InboxPage } from '../pages/inbox/inbox';
import { EditFieldPage } from '../pages/edit-field/edit-field';
// Providers
import { Da31Service } from '../providers/da31.service';
import { AuthProvider } from '../providers/auth-provider';
import { HolidayProvider } from '../providers/holiday-provider';
import { UserProvider } from '../providers/user-provider';
// Reducers
import { reducer } from '../reducers';
// AF2 Settings
export var firebaseConfig = {
    apiKey: "AIzaSyDxQGpcuDF34HJUn467JNGzuKb0XYoFeVk",
    authDomain: "popsmoke-mobileweb.firebaseapp.com",
    databaseURL: "https://popsmoke-mobileweb.firebaseio.com",
    storageBucket: "popsmoke-mobileweb.appspot.com",
    messagingSenderId: "628791475392"
};
export var firebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password,
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            PacketPage,
            PersonalInfoFormPage,
            AddressFormPage,
            StationFormPage,
            LeaveFormPage,
            PdfPage,
            HomePage,
            LaunchPage,
            LoginPage,
            MainTabPage,
            PersonalInfoProfilePage,
            DocumentsPage,
            PacketHistoryPage,
            InboxPage,
            EditFieldPage
        ],
        imports: [
            IonicModule.forRoot(MyApp),
            StoreModule.provideStore(reducer),
            AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            PacketPage,
            PersonalInfoFormPage,
            AddressFormPage,
            StationFormPage,
            LeaveFormPage,
            PdfPage,
            HomePage,
            LaunchPage,
            LoginPage,
            MainTabPage,
            PersonalInfoProfilePage,
            DocumentsPage,
            PacketHistoryPage,
            InboxPage,
            EditFieldPage
        ],
        providers: [
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            Da31Service,
            AuthProvider,
            HolidayProvider,
            UserProvider
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map