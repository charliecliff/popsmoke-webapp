import { Action } from '@ngrx/store';
import { type } from '../util';
import { Menu } from '../models/Menu';
import { INITIAL_MENU } from '../config/menuConstants';

export const MenuActionTypes = {
  SET_MENU: type('SET_MENU'),
  SELECT_MENU_OPTION: type('SELECT_MENU_OPTION'),
};

export class SetMenuAction implements Action {
  type = MenuActionTypes.SET_MENU;
  constructor(public payload: Object) { }
}

export class SelectMenuOptionAction implements Action {
  type = MenuActionTypes.SELECT_MENU_OPTION;
  constructor(public payload: string) { }
}

export type MenuActions = SetMenuAction |
                          SelectMenuOptionAction;

const initialState: Menu = new Menu(INITIAL_MENU);

export function reducer(state = initialState, action: MenuActions ): Menu {  
    switch(action.type) {
        case MenuActionTypes.SET_MENU:
        	var newMenu = new Menu(action.payload);
    		  return Object.assign({}, newMenu);
        case MenuActionTypes.SELECT_MENU_OPTION:
          var newMenu = new Menu(INITIAL_MENU);
          newMenu.selectOption(action.payload);
          return Object.assign({}, newMenu);
        default:
			    return state;	
    };
}