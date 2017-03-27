import { Action } from '@ngrx/store';
import { type } from '../util';

import { Holiday } from '../models/Holiday';

export const HolidayActionTypes = {
  SET_HOLIDAYS: type('SET_HOLIDAYS'),
  CLEAR_HOLIDAY: type('CLEAR_HOLIDAY'),
};

export class SetHolidaysAction implements Action {
  type = HolidayActionTypes.SET_HOLIDAYS;
  constructor(public payload: Holiday[]) { }
}

export class ClearHolidayAction implements Action {
  type = HolidayActionTypes.CLEAR_HOLIDAY;
  constructor(public payload: Holiday) { }
}

export type HolidayActions = SetHolidaysAction | 
														 ClearHolidayAction;

export function reducer(state = [], action: HolidayActions ): Holiday[] {  
	switch(action.type) {
		case HolidayActionTypes.SET_HOLIDAYS:
			var holidays = (action as SetHolidaysAction).payload as Holiday[];
			return Object.assign({}, holidays);					
		default:
			return state;	
   };
}