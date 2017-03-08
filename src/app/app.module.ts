import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { PacketPage } from '../pages/packet/packet';

// DA-31 Form Steps
import { PersonalinfoFormPage } from '../pages/personalinfo-form/personalinfo-form';
import { AddressFormPage } from '../pages/address-form/address-form';
import { StationFormPage } from '../pages/station-form/station-form';
import { LeaveFormPage } from '../pages/leave-form/leave-form';

@NgModule({
  declarations: [
    MyApp,
    PacketPage,
    PersonalinfoFormPage,
    AddressFormPage,
    StationFormPage,
    LeaveFormPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PacketPage,
    PersonalinfoFormPage,
    AddressFormPage,
    StationFormPage,
    LeaveFormPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
