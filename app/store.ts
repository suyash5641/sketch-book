import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./slice/menuItemSlice";
import ToolboxReducer from "./slice/toolBoxSlice";

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
    toolbox: ToolboxReducer,
  },
});
