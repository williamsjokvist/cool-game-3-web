import { CharacterModel } from "@/types/character";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type CharacterPopupState = {
  isOpen: boolean;
  character: CharacterModel | null;
  left: number;
  top: number;
}

const initialState: CharacterPopupState = {
  isOpen: false,
  character: null,
  left: 0,
  top: 0,
};

type openCharacterPopupAction = {
  character: CharacterModel;
  left: number;
  top: number;
}

type closeCharacterPopupAction = {
  left: number;
  top: number,
}

export const characterPopupSlice = createSlice({
  name: "characterPopup",
  initialState,
  reducers: {
    openCharacterPopup: (state, action: PayloadAction<openCharacterPopupAction>) => {
      state.isOpen = true;
      state.character = action.payload.character;
      state.left = action.payload.left;
      state.top = action.payload.top;
    },
    closeCharacterPopup: (state, action: PayloadAction<closeCharacterPopupAction>) => {
      state.isOpen = false;
      state.left = action.payload.left;
      state.top = action.payload.top;
    }
  }
})

export const { openCharacterPopup, closeCharacterPopup } = characterPopupSlice.actions;
export default characterPopupSlice.reducer;