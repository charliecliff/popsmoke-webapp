import * as da31BuilderActions from '../actions/da31builder.actions';
import { Da31Form } from '../models/Da31Form';

const initialState: Da31Form = {
    firstName: "string",  
    lastName: "string",
    middleInitial: "string",
    ssn: "string",
    rank: "string",
    phoneNumber: "string",
    platoon: "string",  
    company: "string", 
    battalion: "string", 
    brigade: "string", 
    division: "string", 
    post: "string", 
    zip: "string",
    accruedLeave: 0,
    requestedLeave: 0,
    advancedLeave: 0,
    excessLeave: 0,
    leaveFromDate: new Date(),
    leaveToDate: new Date(),
    destination: {
        street: "string",  
        city: "string",  
        state: "string",  
        zip: "string" 
    }
};

export function reducer(state = initialState, action: da31BuilderActions.Da31BuilderActions ): Da31Form {  
    switch(action.type) {
        case da31BuilderActions.Da31BuilderActionTypes.ADD_PERSONAL_INFO_TO_DA_31:
    		return Object.assign({}, state, action.payload);
    	case da31BuilderActions.Da31BuilderActionTypes.ADD_STATION_TO_DA_31:
            return Object.assign({}, state, action.payload);
    	case da31BuilderActions.Da31BuilderActionTypes.ADD_DESTINATION_TO_DA_31:
            return Object.assign({}, state, {destination: action.payload});
		default:
			return state;	
    };
}