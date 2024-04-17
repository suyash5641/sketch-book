"use client";
import {
  actionItemClick,
  menuItemClick,
  showStrokeToggleOptions,
  showBrushToggleOptions,
  currentMenuItemClick,
} from "@/app/slice/menuItemSlice";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CreateIcon from "@mui/icons-material/Create";
import ReplayIcon from "@mui/icons-material/Replay";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import styles from "./Menu.module.css";
import { MENU_ITEMS } from "@/app/utils/constant";
import Image from "next/image";
export const Menu = () => {
  const dispatch = useDispatch();
  const { currentMenuItem, showStrokeToolOption, showBrushToolOption } =
    useSelector((state: any) => state?.menu);

  const handleMenuClick = (itemName: string) => {
    dispatch(menuItemClick(itemName));
    dispatch(currentMenuItemClick(itemName));
    if (itemName === "PENCIL") {
      dispatch(showStrokeToggleOptions(showStrokeToolOption));
      dispatch(showBrushToggleOptions(showBrushToolOption));
    }
    if (itemName === "ERASER") {
      dispatch(showStrokeToggleOptions(showStrokeToolOption));
      dispatch(showBrushToggleOptions(showBrushToolOption));
    }
  };

  const handleActionItemClick = (itemName: string) => {
    dispatch(actionItemClick(itemName));
    dispatch(currentMenuItemClick(itemName));
  };

  return (
    <Stack flexDirection={"row"} className={styles.container}>
      <Tooltip title="Edit" className={styles.tooltip} arrow>
        <IconButton
          onClick={(e) => handleMenuClick(MENU_ITEMS.PENCIL)}
          className={
            currentMenuItem === MENU_ITEMS.PENCIL
              ? styles.activeMenuIcon
              : styles.inactiveMenuIcon
          }
        >
          <CreateIcon className={styles.icon} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Erase" className={styles.tooltip} arrow>
        <IconButton
          className={
            currentMenuItem === MENU_ITEMS.ERASER
              ? styles.activeMenuIcon
              : styles.inactiveMenuIcon
          }
          onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}
        >
          <Image
            src="./ink_eraser.svg"
            alt="Eraser Logo"
            className={styles.vercelLogo}
            width={18}
            height={18}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Undo" className={styles.tooltip} arrow>
        <IconButton
          className={
            currentMenuItem === MENU_ITEMS.UNDO
              ? styles.activeMenuIcon
              : styles.inactiveMenuIcon
          }
          onClick={() => handleActionItemClick(MENU_ITEMS.UNDO)}
        >
          <ReplayIcon className={styles.icon} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Redo" className={styles.tooltip} arrow>
        <IconButton
          className={
            currentMenuItem === MENU_ITEMS.REDO
              ? styles.activeMenuIcon
              : styles.inactiveMenuIcon
          }
          onClick={() => handleActionItemClick(MENU_ITEMS.REDO)}
        >
          <ReplayIcon className={styles.redoIcon} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Download" className={styles.tooltip} arrow>
        <IconButton
          className={
            currentMenuItem === MENU_ITEMS.DOWNLOAD
              ? styles.activeMenuIcon
              : styles.inactiveMenuIcon
          }
          onClick={() => handleActionItemClick(MENU_ITEMS.DOWNLOAD)}
        >
          <FileDownloadIcon className={styles.icon} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
