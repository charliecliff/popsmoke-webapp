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

import { HomePage } from '../pages/home/home';

import { PersonalInfoProfilePage } from '../ux_user/personal-info-profile/personal-info-profile';
import { StationProfilePage } from '../ux_user/station-profile/station-profile';

// Providers
import { Da31Service } from '../providers/da31.service';
import { AuthProvider } from '../providers/auth-provider';
import { HolidayProvider } from '../providers/holiday-provider';
import { UserProvider } from '../providers/user-provider';

// Reducers
import { reducer } from '../reducers';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyDxQGpcuDF34HJUn467JNGzuKb0XYoFeVk",
  authDomain: "popsmoke-mobileweb.firebaseapp.com",
  databaseURL: "https://popsmoke-mobileweb.firebaseio.com",
  storageBucket: "popsmoke-mobileweb.appspot.com",
  messagingSenderId: "628791475392"
}

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};

@NgModule({
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
    StationProfilePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore( reducer ),
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
    StationProfilePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Da31Service,
    AuthProvider,
    HolidayProvider,
    UserProvider
    ]
})
export class AppModule {}
