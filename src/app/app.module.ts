import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// 
import { MyApp } from './app.component';

// Pages
import { PacketPage } from '../pages/packet/packet';
import { AddressFormPage } from '../pages/address-form/address-form';
import { LeaveFormPage } from '../pages/leave-form/leave-form';
import { PdfPage } from '../pages/pdf/pdf';

import { LaunchPage } from '../pages/launch/launch';
import { LoginPage } from '../pages/login/login';
import { MainTabPage } from '../pages/main-tab/main-tab';


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
import { UserValidationProvider } from '../providers/user-validation-provider';
import { ValidationProvider } from '../providers/validation-provider';

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
    AddressFormPage,
    LeaveFormPage,
    PdfPage,
    HomePage,
    LaunchPage,
    LoginPage,
    MainTabPage,
    DocumentsPage,
    PacketHistoryPage,
    InboxPage,
    EditFieldPage
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
    AddressFormPage,
    LeaveFormPage,
    PdfPage,
    HomePage,
    LaunchPage,
    LoginPage,
    MainTabPage,
    DocumentsPage,
    PacketHistoryPage,
    InboxPage,
    EditFieldPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Da31Service,
    AuthProvider,
    HolidayProvider,
    UserProvider,
    UserValidationProvider,
    ValidationProvider
    ]
})
export class AppModule {}
