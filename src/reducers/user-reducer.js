import { type } from '../util';
import { User } from '../models/User';
export var UserActionTypes = {
    SET_USER: type('SET_USER'),
};
var SetUserAction = (function () {
    function SetUserAction(payload) {
        this.payload = payload;
        this.type = UserActionTypes.SET_USER;
    }
    return SetUserAction;
}());
export { SetUserAction };
var initialState = new User();
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case UserActionTypes.SET_USER:
            var newUser = new User(action.payload);
            return Object.assign({}, newUser);
        default:
            return state;
    }
    ;
}
//# sourceMappingURL=user-reducer.js.map