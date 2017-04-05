import * as errorActions from '../actions/error-actions';
var initialState = {};
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case errorActions.ErrorActionTypes.SET_ERROR:
            return Object.assign({}, state, action.payload);
        case errorActions.ErrorActionTypes.CLEAR_ERROR:
            return Object.assign({}, state, {});
        default:
            return state;
    }
    ;
}
//# sourceMappingURL=error-reducer.js.map