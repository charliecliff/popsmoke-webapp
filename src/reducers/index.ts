import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

// Models
import { Da31Form } from '../models/Da31Form.js';

// Reducers
import * as da31Reducer from './da31Form.reducer';

export interface AppState {
	da31Form: Da31Form;
};

const reducers = {
  da31Form: da31Reducer.reducer
};


const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	return productionReducer(state, action);
}

export const getCurrentForm = (appState: AppState) => appState.da31Form;
