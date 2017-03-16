import { Action } from '@ngrx/store';
import { type } from '../util';

import { Da31Form } from '../models/Da31Form';
import { PersonalInfo } from '../models/PersonalInfo';
import { Station } from '../models/Station';
import { Address } from '../models/Address';


export const Da31BuilderActionTypes = {
  ADD_PERSONAL_INFO_TO_DA_31:    type('ADD_PERSONAL_INFO_TO_DA_31'),
  ADD_STATION_TO_DA_31:          type('ADD_STATION_TO_DA_31'),
  ADD_DESTINATION_TO_DA_31:      type('ADD_DESTINATION_TO_DA_31'),
  ADD_LEAVE_DATA_TO_DA_31:       type('ADD_LEAVE_DATA_TO_DA_31'),
};

export class AddPersonalInfoAction implements Action {
  type = Da31BuilderActionTypes.ADD_PERSONAL_INFO_TO_DA_31;

  constructor(public payload: PersonalInfo) { }
}

export class AddStationAction implements Action {
  type = Da31BuilderActionTypes.ADD_STATION_TO_DA_31;

  constructor(public payload: Station) { }
}

export class AddDestinationAction implements Action {
  type = Da31BuilderActionTypes.ADD_DESTINATION_TO_DA_31;

  constructor(public payload: Address) { }
}

export class AddLeaveDataAction implements Action {
  type = Da31BuilderActionTypes.ADD_LEAVE_DATA_TO_DA_31;

  constructor(public payload: {}) { }
}

export type Da31BuilderActions
  = AddPersonalInfoAction
  | AddStationAction
  | AddDestinationAction
  | AddLeaveDataAction;