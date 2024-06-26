"use client";
import { changeBrushSize, changeColor } from "@/app/slice/toolBoxSlice";
import { MENU_ITEMS, TOOLCOLORS } from "@/app/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ToolBox.module.css";
import { Stack, Typography } from "@mui/material";

export const ToolBox = () => {
  const dispatch = useDispatch();
  const { activeMenuItem, isToggle } = useSelector((state: any) => state?.menu);
  const showStrokeToolOption = isToggle && activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    isToggle &&
    (activeMenuItem === MENU_ITEMS.PENCIL ||
      activeMenuItem === MENU_ITEMS.ERASER);

  const { strokeColor, size } = useSelector(
    (state: any) => state.toolbox[activeMenuItem]
  );

  const updateBrushSize = (e: any) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
  };

  const updateColor = (newColor: string) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
  };

  const showContainer = showStrokeToolOption || showBrushToolOption;

  return (
    <Stack
      className={styles.toolboxContainer}
      sx={{ display: showContainer ? "flex" : "none" }}
    >
      {showStrokeToolOption && (
        <Stack justifyContent={"space-between"} gap={"24px"}>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography className={styles.toolText}>Stroke</Typography>
            <Stack
              style={{
                backgroundColor: `${strokeColor}`,
                width: "24px",
                height: "24px",
                borderRadius: "4px",
              }}
            ></Stack>
          </Stack>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            gap={"16px"}
            className={styles.toolContainer}
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
      )}
      {showBrushToolOption && (
        <Stack className={styles.toolItem}>
          <Typography className={styles.toolText}>Brush Size</Typography>
          <Stack flexDirection={"row"} className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              onChange={updateBrushSize}
              value={size}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
