var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
// Actions
import { Da31BuilderActions } from '../actions/da31builder.actions';
// Reducers
import { da31FormReducer } from '../reducers/da31Form.reducer';
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
            LeaveFormPage
        ],
        imports: [
            IonicModule.forRoot(MyApp),
            StoreModule.provideStore({ Da31Form: da31FormReducer }),
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            PacketPage,
            PersonalInfoFormPage,
            AddressFormPage,
            StationFormPage,
            LeaveFormPage
        ],
        providers: [
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            Da31BuilderActions
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map