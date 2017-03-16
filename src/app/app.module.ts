import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';

import { MyApp } from './app.component';

// Model

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

// 

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
    StoreModule.provideStore( reducer )
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
