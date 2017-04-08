import { Action } from '@ngrx/store';
import { type } from '../util';
import { User } from '../models/User';

export const UserActionTypes = {
  SET_USER: type('SET_USER'),
  SET_USER_ATTRIBUTE: type('SET_USER_ATTRIBUTE'),
};

export class SetUserAction implements Action {
  type = UserActionTypes.SET_USER;
  constructor(public payload: Object) { }
}

export class SetUserAttributeAction implements Action {
  type = UserActionTypes.SET_USER_ATTRIBUTE;
  constructor(public payload: Object) { }
}

export type UserActions = SetUserAction | SetUserAttributeAction;

const initialState: User = new User();

export function reducer(state = initialState, action: UserActions ): User {  
    switch(action.type) {
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
    };
}

function reduceUserAttribute(user, attribute, value) {
  return new User();
}