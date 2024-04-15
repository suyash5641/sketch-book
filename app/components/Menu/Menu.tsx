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
import PopOver from "../Popover/PopOver";
// import { menuItemClick, actionItemClick } from "@/slice/menuSlice";
export const Menu = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector(
    (state: any) => state?.menu?.activeMenuItem
  );
  const isShowStrokeToolOption = useSelector(
    (state: any) => state?.menu?.showStrokeToolOption
  );
  const isShowBrushToolOption = useSelector(
    (state: any) => state?.menu?.showBrushToolOption
  );
  const showToggle = useSelector((state: any) => state?.menu?.showToggle);
  // const { activeMenuItem, isShowStrokeToolOption, isShowBrushToolOption } =
  //   useSelector((state: any) => state?.menu);
  const handleMenuClick = (itemName: string) => {
    dispatch(menuItemClick(itemName));
    dispatch(currentMenuItemClick(itemName));
    console.log("menu", {
      itemName,
      isShowStrokeToolOption: isShowStrokeToolOption,

      isShowBrushToolOption: isShowBrushToolOption,
      showToggle: showToggle,
    });
    if (itemName === "PENCIL") {
      // dispatch(showStrokeToggleOptions(true));
      // dispatch(showBrushToggleOptions(true));
      dispatch(showStrokeToggleOptions(isShowStrokeToolOption));
      dispatch(showBrushToggleOptions(isShowBrushToolOption));
    }
    if (itemName === "ERASER") {
      // dispatch(showStrokeToggleOptions(false));
      // dispatch(showBrushToggleOptions(true));

      dispatch(showStrokeToggleOptions(isShowStrokeToolOption));
      dispatch(showBrushToggleOptions(isShowBrushToolOption));
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
          // onClick={(e) => {
          //   e.stopPropagation(); // Prevent the click event from reaching the popover
          //   handleMenuClick(MENU_ITEMS.PENCIL); // Perform your button action
          // }}
          className={
            activeMenuItem === MENU_ITEMS.PENCIL
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
            activeMenuItem === MENU_ITEMS.ERASER
              ? styles.activeMenuIcon
              : styles.inactiveMenuIcon
          }
          // onClick={(e) => {
          //   e.stopPropagation(); // Prevent the click event from reaching the popover
          //   handleMenuClick(MENU_ITEMS.ERASER); // Perform your button action
          // }}
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
        <IconButton onClick={() => handleActionItemClick(MENU_ITEMS.UNDO)}>
          <ReplayIcon className={styles.icon} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Redo" className={styles.tooltip} arrow>
        <IconButton onClick={() => handleActionItemClick(MENU_ITEMS.REDO)}>
          <ReplayIcon className={styles.redoIcon} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Download" className={styles.tooltip} arrow>
        <IconButton onClick={() => handleActionItemClick(MENU_ITEMS.DOWNLOAD)}>
          <FileDownloadIcon className={styles.icon} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
