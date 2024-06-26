import { createSlice } from "@reduxjs/toolkit";
import { COLORS, MENU_ITEMS } from "../utils/constant";

const initialState = {
  [MENU_ITEMS.PENCIL]: {
    strokeColor: COLORS.BLACK,
    size: 3,
  },
  [MENU_ITEMS.ERASER]: {
    strokeColor: COLORS.WHITE,
    size: 3,
  },
  [MENU_ITEMS.UNDO]: {},
  [MENU_ITEMS.REDO]: {},
  [MENU_ITEMS.DOWNLOAD]: {},
};

export const toolBoxSlice = createSlice({
  name: "toolbox",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      state[action.payload.item].strokeColor = action?.payload?.color;
    },
    changeBrushSize: (state, action) => {
      state[action.payload.item].size = action?.payload?.size;
    },
  },
});

export const { changeColor, changeBrushSize } = toolBoxSlice.actions;

export default toolBoxSlice.reducer;
