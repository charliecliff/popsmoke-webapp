import { Action } from '@ngrx/store';
import { type } from '../util';

import { User } from '../models/User';

export const UserActionTypes = {
  SET_USER: type('SET_USER'),
};

export class SetUserAction implements Action {
  type = UserActionTypes.SET_USER;
  
  constructor(public payload: User) { }
}

export type UserActions = SetUserAction;