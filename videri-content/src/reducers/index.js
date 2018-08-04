import { combineReducers } from "redux";
import loginReducer from "../containers/Login/reducer";

const rootReducer = combineReducers(
    loginReducer,
);

export default rootReducer;
