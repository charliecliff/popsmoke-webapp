import { type } from '../util';
import { Menu } from '../models/Menu';
import { INITIAL_MENU } from '../config/menuConstants';
export var MenuActionTypes = {
    SET_MENU: type('SET_MENU'),
    SELECT_MENU_OPTION: type('SELECT_MENU_OPTION'),
};
var SetMenuAction = (function () {
    function SetMenuAction(payload) {
        this.payload = payload;
        this.type = MenuActionTypes.SET_MENU;
    }
    return SetMenuAction;
}());
export { SetMenuAction };
var SelectMenuOptionAction = (function () {
    function SelectMenuOptionAction(payload) {
        this.payload = payload;
        this.type = MenuActionTypes.SELECT_MENU_OPTION;
    }
    return SelectMenuOptionAction;
}());
export { SelectMenuOptionAction };
var initialState = new Menu(INITIAL_MENU);
export function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case MenuActionTypes.SET_MENU:
            var newMenu = new Menu(action.payload);
            return Object.assign({}, newMenu);
        case MenuActionTypes.SELECT_MENU_OPTION:
            var newMenu = new Menu(INITIAL_MENU);
            newMenu.selectOption(action.payload);
            return Object.assign({}, newMenu);
        default:
            return state;
    }
    ;
}
//# sourceMappingURL=menu-reducer.js.map