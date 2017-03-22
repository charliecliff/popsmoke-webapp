import { Action } from '@ngrx/store';
import { type } from '../util';

export const ErrorActionTypes = {
  SET_ERROR: type("SET_ERROR"),
  CLEAR_ERROR: type("CLEAR_ERROR")
};

export class SetErrorAction implements Action {
  type = ErrorActionTypes.SET_ERROR;

  constructor(public payload: Error) { }
}

export class ClearErrorAction implements Action {
  type = ErrorActionTypes.CLEAR_ERROR;

  constructor(public payload: Error) { }
}

export type ErrorActions = SetErrorAction | 
						   ClearErrorAction;