import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';


import { MyApp } from './app.component';

// Pages
import { PacketPage } from '../pages/packet/packet';
import { PersonalInfoFormPage } from '../pages/personalinfo-form/personalinfo-form';
import { AddressFormPage } from '../pages/address-form/address-form';
import { StationFormPage } from '../pages/station-form/station-form';
import { LeaveFormPage } from '../pages/leave-form/leave-form';
import { PdfPage } from '../pages/pdf/pdf';

// Providers
import { Da31Service } from '../providers/da31.service';

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

@NgModule({
  declarations: [
    MyApp,
    PacketPage,
    PersonalInfoFormPage,
    AddressFormPage,
    StationFormPage,
    LeaveFormPage,
    PdfPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore( reducer ),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PacketPage,
    PersonalInfoFormPage,
    AddressFormPage,
    StationFormPage,
    LeaveFormPage,
    PdfPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Da31Service]
})
export class AppModule {}
