import { combineReducers } from "redux";
import companiesReducer from "./companies/companiesReducer";
import modalReducer from "./modal/modalReducer";

const rootReducer = combineReducers({
  modal: modalReducer,
  companies: companiesReducer,
});

export default rootReducer;