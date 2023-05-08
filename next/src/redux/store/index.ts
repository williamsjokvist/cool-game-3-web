import { configureStore } from "@reduxjs/toolkit";
import characterPopupReducer from "../features/character-popup-slice";

export const store = configureStore({
  reducer: {
    characterPopupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;