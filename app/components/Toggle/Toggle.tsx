"use client";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import styles from "./Toggle.module.css";
import { Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Switch from "@mui/material/Switch";
import { MENU_ITEMS } from "@/app/utils/constant";
import { useEffect, useState } from "react";
import {
  showStrokeToggleOptions,
  showBrushToggleOptions,
  showToggle,
} from "@/app/slice/menuItemSlice";

export const Toggle = () => {
  const showTogglew = useSelector((state: any) => state?.menu?.showToggle);
  const [checked, setChecked] = useState<boolean>(showTogglew ?? true);
  const dispatch = useDispatch();
  const activeMenuItem = useSelector(
    (state: any) => state?.menu?.activeMenuItem
  );
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(showToggle(event.target.checked));
    // if (activeMenuItem === MENU_ITEMS.PENCIL) {
    //   dispatch(showStrokeToggleOptions(event.target.checked));
    //   dispatch(showBrushToggleOptions(event.target.checked));
    // } else if (activeMenuItem === MENU_ITEMS.ERASER) {
    //   console.log(event.target.checked, "toggle-data");
    //   dispatch(showBrushToggleOptions(event.target.checked));
    //   dispatch(showStrokeToggleOptions(false));
    // }
  };

  useEffect(() => {
    if (activeMenuItem === MENU_ITEMS.PENCIL) {
      setText("Stroke and Brush Size");
    } else if (activeMenuItem === MENU_ITEMS.ERASER) {
      setText("Brush Size ");
    }
  }, [activeMenuItem]);

  return (
    <Stack flexDirection={"row"} className={styles.toggleBox}>
      <Typography className={styles.toggleText}>{text}</Typography>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Stack>
  );
};
