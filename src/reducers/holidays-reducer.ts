import { Action } from '@ngrx/store';
import { type } from '../util';

import { Holiday } from '../models/Holiday';

export const HolidayActionTypes = {
  SET_HOLIDAYS: type('SET_HOLIDAYS'),
  UPDATE_HOLIDAY: type('UPDATE_HOLIDAY'),
  CLEAR_HOLIDAY: type('CLEAR_HOLIDAY'),
};

export class SetHolidaysAction implements Action {
  type = HolidayActionTypes.SET_HOLIDAYS;
  constructor(public payload: Holiday[]) { }
}

export class UpdateHolidayAction implements Action {
  type = HolidayActionTypes.UPDATE_HOLIDAY;
  constructor(public payload: Holiday) { }
}

export class ClearHolidayAction implements Action {
  type = HolidayActionTypes.CLEAR_HOLIDAY;
  constructor(public payload: Holiday) { }
}

export type HolidayActions = SetHolidaysAction | 
														 UpdateHolidayAction | 
														 ClearHolidayAction;


export function reducer(state = [], action: HolidayActions ): Holiday[] {  
    switch(action.type) {
			case HolidayActionTypes.SET_HOLIDAYS:
		
			
			case HolidayActionTypes.UPDATE_HOLIDAY:
				var holiday = (action as UpdateHolidayAction).payload as Holiday;
				var newState = state.filter(person => person.id !== holiday.id);
				return [ ...newState, Object.assign({}, holiday) ];
			
			case HolidayActionTypes.CLEAR_HOLIDAY:
				var holiday = (action as ClearHolidayAction).payload as Holiday;
				var newState = state.filter(person => person.id !== holiday.id);
				return newState;
			
			default:
				return state;	
    };
}