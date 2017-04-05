import { type } from '../util';
export var ErrorActionTypes = {
    SET_ERROR: type("SET_ERROR"),
    CLEAR_ERROR: type("CLEAR_ERROR")
};
var SetErrorAction = (function () {
    function SetErrorAction(payload) {
        this.payload = payload;
        this.type = ErrorActionTypes.SET_ERROR;
    }
    return SetErrorAction;
}());
export { SetErrorAction };
var ClearErrorAction = (function () {
    function ClearErrorAction(payload) {
        this.payload = payload;
        this.type = ErrorActionTypes.CLEAR_ERROR;
    }
    return ClearErrorAction;
}());
export { ClearErrorAction };
//# sourceMappingURL=error-actions.js.map