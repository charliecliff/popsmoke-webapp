import * as errorActions from '../actions/error-actions';

const initialState: Error = {

} as Error;

export function reducer(state = initialState, action: errorActions.ErrorActions ): Error {  
    switch(action.type) {
        case errorActions.ErrorActionTypes.SET_ERROR:
    		return Object.assign({}, state, action.payload);
		case errorActions.ErrorActionTypes.CLEAR_ERROR:
    		return Object.assign({}, state, {});
		default:
			return state;	
    };
}