import { Store, ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as Models from "../models";

import * as userReducer from './user-reducer';
import * as holidaysReducer from './holidays-reducer';
import * as menuReducer from './menu-reducer';
import * as packetsReducer from './packets-reducer';

export { Store } from '@ngrx/store';

export interface AppState {
	user: Models.User;
	holidays: Models.Holiday[];
	menu: Models.Menu;
	packets: {};
};

const reducers = {
	user: userReducer.reducer,
	holidays: holidaysReducer.reducer,
	menu: menuReducer.reducer,
	packets: packetsReducer.reducer,
};
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	return productionReducer(state, action);
}
