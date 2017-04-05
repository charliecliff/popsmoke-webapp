import { combineReducers } from '@ngrx/store';
import * as userReducer from './user-reducer';
import * as holidaysReducer from './holidays-reducer';
import * as menuReducer from './menu-reducer';
import * as userIDReducer from './userID-reducer';
;
var reducers = {
    user: userReducer.reducer,
    holidays: holidaysReducer.reducer,
    menu: menuReducer.reducer,
    userID: userIDReducer.reducer,
};
var productionReducer = combineReducers(reducers);
export function reducer(state, action) {
    return productionReducer(state, action);
}
//# sourceMappingURL=index.js.map