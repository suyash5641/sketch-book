import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS } from "../utils/constant";

const initialState = {
  activeMenuItem: MENU_ITEMS.PENCIL,
  actionMenuItem: null,
};

export const menuItemSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    menuItemClick: (state, action) => {
      state.activeMenuItem = action.payload;
    },
    actionItemClick: (state, action) => {
      state.actionMenuItem = action.payload;
    },
  },
});

export const { menuItemClick, actionItemClick } = menuItemSlice.actions;

export default menuItemSlice.reducer;
