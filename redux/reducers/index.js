import { combineReducers } from "redux";
import authReducer from "./authReducer";
import membersReducer from "./membersReducer";

export default combineReducers({
  auth: authReducer,
  members: membersReducer
});
