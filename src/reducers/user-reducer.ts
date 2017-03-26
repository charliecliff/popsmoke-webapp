import { Action } from '@ngrx/store';
import { type } from '../util';
import { User } from '../models/User';

export const UserActionTypes = {
  SET_USER: type('SET_USER'),
};

export class SetUserAction implements Action {
  type = UserActionTypes.SET_USER;
  constructor(public payload: Object) { }
}

export type UserActions = SetUserAction;

const initialState: User = new User();

export function reducer(state = initialState, action: UserActions ): User {  
    switch(action.type) {
        case UserActionTypes.SET_USER:
        	var newUser = new User(action.payload);
    		return Object.assign({}, newUser);
		default:
			return state;	
    };
}