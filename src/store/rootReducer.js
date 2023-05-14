import { combineReducers } from "@reduxjs/toolkit";
import ThemeReducer from "./Reducers/ThemeReducer";

const rootReducer = combineReducers({
  ThemeReducer: ThemeReducer,
});

export default rootReducer;
