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
      var holidays = createHolidayArray( (action as SetHolidaysAction).payload);
          return holidays;					
    default:
      return state;	
  };
}

export function createHolidayArray(payloadArray){
 var outputArray = new Array();
	for (var i = payloadArray.length - 1; i >= 0; i--) {
		let map = payloadArray[i];
		let holiday = new Holiday(map);
		outputArray.push(holiday);
	}
	return outputArray;
}