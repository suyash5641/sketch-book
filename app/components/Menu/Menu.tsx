"use client";
import { actionItemClick, menuItemClick } from "@/app/slice/menuItemSlice";
import { IconButton, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CreateIcon from "@mui/icons-material/Create";
import ReplayIcon from "@mui/icons-material/Replay";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import styles from "./Menu.module.css";
import { MENU_ITEMS } from "@/app/utils/constant";
import Image from "next/image";
// import { menuItemClick, actionItemClick } from "@/slice/menuSlice";
export const Menu = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector(
    (state: any) => state?.menu?.activeMenuItem
  );
  const handleMenuClick = (itemName: string) => {
    dispatch(menuItemClick(itemName));
  };

  const handleActioItemClick = (itemName: string) => {
    dispatch(actionItemClick(itemName));
  };

  // console.log(activeMenuItem, "testt ", activeMenuItem === MENU_ITEMS.PENCIL);

  return (
    <Stack flexDirection={"row"} className={styles.menuContainer}>
      <Stack flexDirection={"row"} className={styles.container}>
        <IconButton
          onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}
          className={
            activeMenuItem === MENU_ITEMS.PENCIL
              ? styles.activeMenuIcon
              : styles.inactiveMenuIcon
          }
        >
          <CreateIcon className={styles.icon} />
        </IconButton>
        <IconButton
          className={
            activeMenuItem === MENU_ITEMS.ERASER
              ? styles.activeMenuIcon
              : styles.inactiveMenuIcon
          }
          onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}
        >
          <Image
            src="./ink_eraser.svg"
            alt="Eraser Logo"
            className={styles.vercelLogo}
            width={24}
            height={24}
          />
        </IconButton>
        <IconButton onClick={() => handleActioItemClick(MENU_ITEMS.UNDO)}>
          <ReplayIcon className={styles.icon} />
        </IconButton>
        <IconButton onClick={() => handleActioItemClick(MENU_ITEMS.REDO)}>
          <ReplayIcon className={styles.redoIcon} />
        </IconButton>
        <IconButton onClick={() => handleActioItemClick(MENU_ITEMS.DOWNLOAD)}>
          <FileDownloadIcon className={styles.icon} />
        </IconButton>
      </Stack>
    </Stack>
  );
};
