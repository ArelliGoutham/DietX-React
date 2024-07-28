import { combineReducers } from 'redux';
import AuthReducer from "./slices/AuthSlice";

const rootReducer = combineReducers({
    auth: AuthReducer,
});

export default rootReducer;
