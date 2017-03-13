import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';
import { Da31Form } from './models/Da31Form.js';
import { User } from './models/User.js';

export interface AppState {
	da31Form: Da31Form;
	completedPackets: [Da31Form];
	user: User;
};
