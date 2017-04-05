import { type } from '../util';
import { Holiday } from '../models/Holiday';
export var HolidayActionTypes = {
    SET_HOLIDAYS: type('SET_HOLIDAYS'),
    CLEAR_HOLIDAY: type('CLEAR_HOLIDAY'),
};
var SetHolidaysAction = (function () {
    function SetHolidaysAction(payload) {
        this.payload = payload;
        this.type = HolidayActionTypes.SET_HOLIDAYS;
    }
    return SetHolidaysAction;
}());
export { SetHolidaysAction };
var ClearHolidayAction = (function () {
    function ClearHolidayAction(payload) {
        this.payload = payload;
        this.type = HolidayActionTypes.CLEAR_HOLIDAY;
    }
    return ClearHolidayAction;
}());
export { ClearHolidayAction };
export function reducer(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case HolidayActionTypes.SET_HOLIDAYS:
            var holidays = createHolidayArray(action.payload);
            return holidays;
        default:
            return state;
    }
    ;
}
export function createHolidayArray(payloadArray) {
    var outputArray = new Array();
    for (var i = payloadArray.length - 1; i >= 0; i--) {
        var map = payloadArray[i];
        var holiday = new Holiday(map);
        outputArray.push(holiday);
    }
    return outputArray;
}
//# sourceMappingURL=holidays-reducer.js.map