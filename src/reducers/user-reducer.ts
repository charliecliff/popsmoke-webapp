import * as userActions from '../actions/user.actions';
import { User } from '../models/User';

const initialState: User = {

} as User;

export function reducer(state = initialState, action: userActions.UserActions ): User {  
    switch(action.type) {
        case userActions.UserActionTypes.SET_USER:
    		return Object.assign({}, state, action.payload);
		default:
			return state;	
    };
}