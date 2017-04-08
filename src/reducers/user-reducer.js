import { type } from '../util';
import { User } from '../models/User';
export var UserActionTypes = {
    SET_USER: type('SET_USER'),
    SET_USER_ATTRIBUTE: type('SET_USER_ATTRIBUTE'),
};
var SetUserAction = (function () {
    function SetUserAction(payload) {
        this.payload = payload;
        this.type = UserActionTypes.SET_USER;
    }
    return SetUserAction;
}());
export { SetUserAction };
var SetUserAttributeAction = (function () {
    function SetUserAttributeAction(payload) {
        this.payload = payload;
        this.type = UserActionTypes.SET_USER_ATTRIBUTE;
    }
    return SetUserAttributeAction;
}());
export { SetUserAttributeAction };
var initialState = new User();
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case UserActionTypes.SET_USER:
            var newUser = new User(action.payload);
            return Object.assign({}, newUser);
        case UserActionTypes.SET_USER_ATTRIBUTE:
            var attribute = action.payload["attribute"];
            var value = action.payload["value"];
            var newUser = reduceUserAttribute(state, attribute, value);
            return Object.assign({}, newUser);
        default:
            return state;
    }
    ;
}
function reduceUserAttribute(user, attribute, value) {
    return new User();
}
//# sourceMappingURL=user-reducer.js.map