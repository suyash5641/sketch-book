"use client";
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Toggle } from "../Toggle/Toggle";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { IconButton, Stack, Tooltip } from "@mui/material";
import styles from "./Popover.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  showStrokeToggleOptions,
  showBrushToggleOptions,
} from "@/app/slice/menuItemSlice";
import { MENU_ITEMS } from "@/app/utils/constant";

export default function PopOver() {
  //   const dispatch = useDispatch();
  //   const activeMenuItem = useSelector(
  //     (state: any) => state?.menu?.activeMenuItem
  //   );
  const { currentMenuItem } = useSelector((state: any) => state?.menu);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    // console.log(event.currentTarget, "testttt", activeMenuItem);
    // if (activeMenuItem === MENU_ITEMS.PENCIL) {
    //   dispatch(
    //     showStrokeToggleOptions(event.currentTarget === null ? false : true)
    //   );
    //   dispatch(showBrushToggleOptions(false));
    // } else if (activeMenuItem === MENU_ITEMS.ERASER) {
    //   dispatch(
    //     showBrushToggleOptions(event.currentTarget === null ? false : true)
    //   );
    //   dispatch(showStrokeToggleOptions(false));
    // }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const showPopOver =
    currentMenuItem === MENU_ITEMS.UNDO ||
    currentMenuItem === MENU_ITEMS.REDO ||
    currentMenuItem === MENU_ITEMS.DOWNLOAD;

  //   React.useEffect(() => {
  //     console.log(actionMenuItem, "kkk", showPopOver, activeMenuItem);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [actionMenuItem]);
  //   console.log(id, "test ");

  return (
    !showPopOver && (
      <Stack className={styles.popover}>
        <Tooltip title="Edit" arrow>
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            //   className={
            //     activeMenuItem === MENU_ITEMS.PENCIL
            //       ? styles.activeMenuIcon
            //       : styles.inactiveMenuIcon
            //   }
            className={styles.button}
          >
            <ColorLensIcon className={styles.icon} />
          </Button>
        </Tooltip>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          //   anchorOrigin={{
          //     vertical: "bottom",
          //     horizontal: "left",
          //   }}
          //   sx={{
          //     zIndex: "unset",
          //     backdropFilter: { xs: "blur(2px)", md: "unset" },
          //   }}
          //   disablePortal
          //   anchorOrigin={{
          //     vertical: "center",
          //     horizontal: "right",
          //   }}
          //   transformOrigin={{
          //     vertical: "center",
          //     horizontal: "left",
          //   }}
          //   BackdropProps={{ invisible: false }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            zIndex: "unset",
            // bgcolor: { xs: "rgba(0,0,0,0.2)", md: "unset" },
            // backdropFilter: { xs: "blur(2px)", md: "unset" },
            ul: { py: "0px" },
            ".MuiPaper-root": {
              borderRadius: "10px",
              boxShadow: "2px 2px 18px rgb(0 0 0 / 20%)",
              border: " 1px solid #ddd",
              width: { xs: "100%", md: "fit-content" },
            },
          }}
          disablePortal
        >
          <Toggle />
        </Popover>
      </Stack>
    )
  );
}
