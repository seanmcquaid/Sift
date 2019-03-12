import {combineReducers} from "redux";
import loginReducer from "./loginReducer";
import categoryReducer from "./categoryReducer";

// import smaller reducers here

const rootReducer = combineReducers({
    reg : loginReducer,
    login : loginReducer,
    category: categoryReducer,
})

export default rootReducer;