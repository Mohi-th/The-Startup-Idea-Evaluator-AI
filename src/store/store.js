// store.js
import { configureStore } from "@reduxjs/toolkit";
import ideasReducer from "./IdeasSlice";

export const store = configureStore({
  reducer: {
    ideas: ideasReducer,
  },
});
