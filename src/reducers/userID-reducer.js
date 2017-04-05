import { type } from '../util';
export var UIDActionTypes = {
    SET_USER_ID: type("SET_USER_ID"),
};
var SetUserIDAction = (function () {
    function SetUserIDAction(payload) {
        this.payload = payload;
        this.type = UIDActionTypes.SET_USER_ID;
    }
    return SetUserIDAction;
}());
export { SetUserIDAction };
export function reducer(state, action) {
    if (state === void 0) { state = ""; }
    switch (action.type) {
        case UIDActionTypes.SET_USER_ID:
            return action.payload["userID"];
        default:
            return state;
    }
    ;
}
//# sourceMappingURL=userID-reducer.js.map