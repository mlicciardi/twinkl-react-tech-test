import { combineReducers } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsSlice";

const rootReducer = combineReducers({
  posts: postsReducer,
});

export default rootReducer;
