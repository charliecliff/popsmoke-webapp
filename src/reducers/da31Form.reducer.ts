import { ActionReducer, Action } from '@ngrx/store';  
import { Da31BuilderActions } from '../actions/da31builder.actions';
import { Da31Form } from '../models/Da31Form';
import { PersonalInfo } from '../models/PersonalInfo';

export const da31FormReducer: ActionReducer<Da31Form> = (state: Da31Form, action: Action) => {  
    switch(action.type) {
        case Da31BuilderActions.ADD_PERSONAL_INFO_TO_DA_31:
    		return Object.assign({}, state, action.payload);
    	case Da31BuilderActions.ADD_STATION_TO_DA_31:
            console.log( Object.assign({}, state, action.payload) );
            return Object.assign({}, state, action.payload);
    	case Da31BuilderActions.ADD_DESTINATION_TO_DA_31:
            console.log( Object.assign({}, state, {destination: action.payload}) );
            return Object.assign({}, state, {destination: action.payload});
		default:
			return state;	
    };
}