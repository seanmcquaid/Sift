import {combineReducers} from "redux";
import loginReducer from "./loginReducer";

// import smaller reducers here

const rootReducer = combineReducers({
    reg : loginReducer,
    login : loginReducer,
})

export default rootReducer;