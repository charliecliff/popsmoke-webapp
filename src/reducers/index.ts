import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { Da31Form } from '../models/Da31Form';
import { User } from '../models/User';
import * as da31Reducer from './da31Form.reducer';
import * as userReducer from './user-reducer';
import * as errorReducer from './error-reducer';

export interface AppState {
	selectedFormURL: string;
	da31Form: Da31Form;
	user: User;
	error: Error;
};

const reducers = {
  da31Form: da31Reducer.reducer,
  user: userReducer.reducer,
  error: errorReducer.reducer
};

const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	return productionReducer(state, action);
}

export const getSelectedFormURL = (appState: AppState) => appState.selectedFormURL;
export const getCurrentForm = (appState: AppState) => appState.da31Form;

