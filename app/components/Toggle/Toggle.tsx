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
  const { isToggle, activeMenuItem } = useSelector((state: any) => state?.menu);
  const [checked, setChecked] = useState<boolean>(isToggle ?? true);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(showToggle(event.target.checked));
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
        sx={{
          "&.MuiSwitch-root": {
            height: "32px",
            width: "54px",
          },

          "&.MuiSwitch-root .MuiSwitch-thumb": {
            height: "13px",
            width: "13px",
          },
        }}
      />
    </Stack>
  );
};
