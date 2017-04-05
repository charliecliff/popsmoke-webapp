import { type } from '../util';
export var Da31BuilderActionTypes = {
    ADD_PERSONAL_INFO_TO_DA_31: type('ADD_PERSONAL_INFO_TO_DA_31'),
    ADD_STATION_TO_DA_31: type('ADD_STATION_TO_DA_31'),
    ADD_DESTINATION_TO_DA_31: type('ADD_DESTINATION_TO_DA_31'),
    ADD_LEAVE_DATA_TO_DA_31: type('ADD_LEAVE_DATA_TO_DA_31'),
};
var AddPersonalInfoAction = (function () {
    function AddPersonalInfoAction(payload) {
        this.payload = payload;
        this.type = Da31BuilderActionTypes.ADD_PERSONAL_INFO_TO_DA_31;
    }
    return AddPersonalInfoAction;
}());
export { AddPersonalInfoAction };
var AddStationAction = (function () {
    function AddStationAction(payload) {
        this.payload = payload;
        this.type = Da31BuilderActionTypes.ADD_STATION_TO_DA_31;
    }
    return AddStationAction;
}());
export { AddStationAction };
var AddDestinationAction = (function () {
    function AddDestinationAction(payload) {
        this.payload = payload;
        this.type = Da31BuilderActionTypes.ADD_DESTINATION_TO_DA_31;
    }
    return AddDestinationAction;
}());
export { AddDestinationAction };
var AddLeaveDataAction = (function () {
    function AddLeaveDataAction(payload) {
        this.payload = payload;
        this.type = Da31BuilderActionTypes.ADD_LEAVE_DATA_TO_DA_31;
    }
    return AddLeaveDataAction;
}());
export { AddLeaveDataAction };
//# sourceMappingURL=da31builder.actions.js.map