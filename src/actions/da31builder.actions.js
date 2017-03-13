var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var Da31BuilderActions = Da31BuilderActions_1 = (function () {
    function Da31BuilderActions() {
    }
    Da31BuilderActions.prototype.addPersonalInfo = function (personalInfo) {
        return {
            type: Da31BuilderActions_1.ADD_PERSONAL_INFO_TO_DA_31,
            payload: personalInfo
        };
    };
    Da31BuilderActions.prototype.addStation = function (station) {
        return {
            type: Da31BuilderActions_1.ADD_STATION_TO_DA_31,
            payload: station
        };
    };
    Da31BuilderActions.prototype.addDestination = function (destination) {
        return {
            type: Da31BuilderActions_1.ADD_DESTINATION_TO_DA_31,
            payload: destination
        };
    };
    return Da31BuilderActions;
}());
Da31BuilderActions.ADD_PERSONAL_INFO_TO_DA_31 = 'ADD_PERSONAL_INFO_TO_DA_31';
Da31BuilderActions.ADD_STATION_TO_DA_31 = 'ADD_STATION_TO_DA_31';
Da31BuilderActions.ADD_DESTINATION_TO_DA_31 = 'ADD_DESTINATION_TO_DA_31';
Da31BuilderActions.ADD_LEAVE_DATA_TO_DA_31 = 'ADD_LEAVE_DATA_TO_DA_31';
Da31BuilderActions = Da31BuilderActions_1 = __decorate([
    Injectable()
], Da31BuilderActions);
export { Da31BuilderActions };
var Da31BuilderActions_1;
//# sourceMappingURL=da31builder.actions.js.map