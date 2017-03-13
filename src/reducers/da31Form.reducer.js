import { Da31BuilderActions } from '../actions/da31builder.actions';
export var da31FormReducer = function (state, action) {
    switch (action.type) {
        case Da31BuilderActions.ADD_PERSONAL_INFO_TO_DA_31:
            return Object.assign({}, state, action.payload);
        case Da31BuilderActions.ADD_STATION_TO_DA_31:
            console.log(Object.assign({}, state, action.payload));
            return Object.assign({}, state, action.payload);
        case Da31BuilderActions.ADD_DESTINATION_TO_DA_31:
            console.log(Object.assign({}, state, { destination: action.payload }));
            return Object.assign({}, state, { destination: action.payload });
        default:
            return state;
    }
    ;
};
//# sourceMappingURL=da31Form.reducer.js.map