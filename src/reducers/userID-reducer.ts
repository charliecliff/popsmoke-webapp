import { Action } from '@ngrx/store';
import { type } from '../util';

export const UIDActionTypes = {
  SET_USER_ID: type("SET_USER_ID"),
};

export class SetUserIDAction implements Action {
  type = UIDActionTypes.SET_USER_ID;
  constructor(public payload: Object) { }
}

export type UIDActions = SetUserIDAction;

export function reducer(state = "", action: UIDActions ): string {  
    switch(action.type) {
    	case UIDActionTypes.SET_USER_ID:
    		return action.payload["userID"];
			default:
				return state;	
    };
}