import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS } from "../utils/constant";

const initialState = {
  activeMenuItem: MENU_ITEMS.PENCIL,
  currentMenuItem: MENU_ITEMS.PENCIL,
  actionMenuItem: null,
  showBrushToolOption: false,
  showStrokeToolOption: false,
  isToggle: true,
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
  },
});

export const {
  menuItemClick,
  actionItemClick,
  showStrokeToggleOptions,
  showBrushToggleOptions,
  currentMenuItemClick,
  showToggle,
} = menuItemSlice.actions;

export default menuItemSlice.reducer;
