"use client";
import { changeBrushSize, changeColor } from "@/app/slice/toolBoxSlice";
import { DRAWING_TYPE, MENU_ITEMS, TOOLCOLORS } from "@/app/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ToolBox.module.css";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import { IconButton, Stack, Switch, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { drawShape } from "@/app/slice/menuItemSlice";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import GestureIcon from "@mui/icons-material/Gesture";

export const ToolBox = () => {
  const dispatch = useDispatch();
  const { activeMenuItem, isToggle, drawingType } = useSelector(
    (state: any) => state?.menu
  );
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

  // const { isToggle, activeMenuItem } = useSelector((state: any) => state?.menu);
  // const [checked, setChecked] = useState<boolean>(drawingType ?? false);
  // const dispatch = useDispatch();
  const [text, setText] = useState("Stroke and Brush Size");

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  //   dispatch(drawShape(event.target.checked));
  // };

  const handleMenuClick = (itemName: string) => {
    dispatch(drawShape(itemName));
  };

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
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            gap={0.5}
            flexWrap={"wrap"}
          >
            <Typography className={styles.toolText}>Shape</Typography>
            <IconButton onClick={() => handleMenuClick(DRAWING_TYPE.SHAPE)}>
              <RectangleOutlinedIcon
                className={
                  drawingType === DRAWING_TYPE.SHAPE
                    ? styles.activeDrawIcon
                    : styles.inactiveDrawIcon
                }
              />
            </IconButton>
            <Typography className={styles.toolText}>Free hand</Typography>
            <IconButton onClick={() => handleMenuClick(DRAWING_TYPE.FREEHAND)}>
              <GestureIcon
                className={
                  drawingType === DRAWING_TYPE.FREEHAND
                    ? styles.activeDrawIcon
                    : styles.inactiveDrawIcon
                }
              />
            </IconButton>
            <Typography className={styles.toolText}>Line</Typography>
            <IconButton onClick={() => handleMenuClick(DRAWING_TYPE.LINE)}>
              <HorizontalRuleIcon
                className={
                  drawingType === DRAWING_TYPE.LINE
                    ? styles.activeDrawIcon
                    : styles.inactiveDrawIcon
                }
              />
            </IconButton>
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
