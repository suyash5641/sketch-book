import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS, DRAWING_TYPE } from "../utils/constant";

const initialState = {
  activeMenuItem: MENU_ITEMS.PENCIL,
  currentMenuItem: MENU_ITEMS.PENCIL,
  actionMenuItem: null,
  showBrushToolOption: false,
  showStrokeToolOption: false,
  isToggle: true,
  drawingType: DRAWING_TYPE.FREEHAND,
};

export const menuItemSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    menuItemClick: (state, action) => {
      state.activeMenuItem = action.payload;
    },
    currentMenuItemClick: (state, action) => {
      state.currentMenuItem = action.payload;
    },
    actionItemClick: (state, action) => {
      state.actionMenuItem = action.payload;
    },
    showBrushToggleOptions: (state, action) => {
      state.showBrushToolOption = action.payload;
    },
    showStrokeToggleOptions: (state, action) => {
      state.showStrokeToolOption = action.payload;
    },
    showToggle: (state, action) => {
      state.isToggle = action.payload;
    },
    drawShape: (state, action) => {
      state.drawingType = action.payload;
    },
  },
});

export const {
  menuItemClick,
  actionItemClick,
  showStrokeToggleOptions,
  showBrushToggleOptions,
  currentMenuItemClick,
  showToggle,
  drawShape,
} = menuItemSlice.actions;

export default menuItemSlice.reducer;
