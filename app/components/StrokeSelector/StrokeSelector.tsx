"use client";
import styles from "./StrokeSelector.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Fade from "@mui/material/Fade";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Stack, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "@/app/utils/constant";
import { useEffect, useState } from "react";
import {
  showStrokeToggleOptions,
  showBrushToggleOptions,
  showToggle,
} from "@/app/slice/menuItemSlice";

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
      />
    </svg>
  </Paper>
);

export default function StrokeSelector() {
  const { isToggle, activeMenuItem } = useSelector((state: any) => state?.menu);
  const [checked, setChecked] = useState<boolean>(isToggle ?? true);
  const dispatch = useDispatch();
  const [text, setText] = useState("Stroke and Brush Size");

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
    <Stack className={styles.strokeContainer} flexDirection={"row"}>
      <Tooltip title="Edit" arrow>
        <ColorLensIcon />
      </Tooltip>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
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
        }
        className={styles.label}
        label={text}
        sx={{
          "&.MuiFormControlLabel-root .MuiFormControlLabel-label ": {
            fontSize: "12px",
          },
        }}
      />
      {/* <Box sx={{ display: "flex" }}>
        <Fade in={checked}>{icon}</Fade>
      </Box> */}
    </Stack>
  );
}
