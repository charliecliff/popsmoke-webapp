import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';


//  Because FUCK YOU! That's WHY!
import { CustomFormsModule } from 'ng2-validation'

// 
import { MyApp } from './app.component';

// Pages
import { LaunchPage } from '../pages/launch/launch';
import { LoginPage } from '../pages/login/login';
import { MainTabPage } from '../pages/main-tab/main-tab';
import { PacketPage } from '../pages/packet/packet';
import { PdfPage } from '../pages/pdf/pdf';
import { DocumentsPage } from '../pages/documents/documents';
import { HomePage } from '../pages/home/home';
import { PacketHistoryPage } from '../pages/packet-history/packet-history';
import { InboxPage } from '../pages/inbox/inbox';
import { EditFieldPage } from '../pages/edit-field/edit-field';
import { CameraPage } from '../pages/camera/camera';

// Reducers
import { reducer } from '../reducers';



import * as Providers from '../providers';


import { IonDigitKeyboard } from '../third-party-components/ion-digit-keyboard/ion-digit-keyboard';


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
    IonDigitKeyboard,
    PacketPage,
    PdfPage,
    HomePage,
    LaunchPage,
    LoginPage,
    MainTabPage,
    DocumentsPage,
    PacketHistoryPage,
    InboxPage,
    EditFieldPage,
    CameraPage
  ],
  imports: [
    CustomFormsModule,
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore( reducer ),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IonDigitKeyboard,
    PacketPage,
    PdfPage,
    HomePage,
    LaunchPage,
    LoginPage,
    MainTabPage,
    DocumentsPage,
    PacketHistoryPage,
    InboxPage,
    EditFieldPage,
    CameraPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Providers.AuthProvider,
    Providers.DA31Provider,
    Providers.HolidayProvider,
    Providers.ImageAttachmentProvider,
    Providers.UserProvider,
    ]
})
export class AppModule { }
