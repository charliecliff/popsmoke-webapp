import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { Da31Form } from '../models/Da31Form';
import { User } from '../models/User';
import { Holiday } from '../models/Holiday';


import * as userReducer from './user-reducer';
import * as userIDReducer from './userID-reducer';

import * as da31Reducer from './da31Form.reducer';
import * as holidayReducer from './holiday-reducer';
import * as errorReducer from './error-reducer';

export interface AppState {
	
	userID: string;	
	user: User;
	
	holidays: Holiday[];


	error: Error;
	selectedFormURL: string;
	da31Form: Da31Form;
};

const reducers = {
	userID: userIDReducer.reducer,
	user: userReducer.reducer,

  da31Form: da31Reducer.reducer,
  error: errorReducer.reducer
};

const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	return productionReducer(state, action);
}
