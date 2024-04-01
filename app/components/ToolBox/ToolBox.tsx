"use client";
import { changeBrushSize, changeColor } from "@/app/slice/toolBoxSlice";
import { MENU_ITEMS, TOOLCOLORS } from "@/app/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ToolBox.module.css";
import { Stack } from "@mui/material";

export const ToolBox = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state: any) => state.menu.activeMenuItem);
  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.PENCIL ||
    activeMenuItem === MENU_ITEMS.ERASER;
  const { color, size } = useSelector(
    (state: any) => state.toolbox[activeMenuItem]
  );

  const updateBrushSize = (e: any) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
  };

  const updateColor = (newColor: string) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
  };

  return (
    <Stack className={styles.toolboxContainer}>
      <Stack justifyContent={"space-between"} gap={"24px"}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <p>Stroke</p>
          <Stack
            style={{
              backgroundColor: `${color}`,
              width: "24px",
              height: "24px",
            }}
          ></Stack>
        </Stack>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          gap={"16px"}
        >
          {TOOLCOLORS.map((data, index) => (
            <Stack
              key={index}
              className={styles[data]}
              onClick={() => updateColor(data)}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
