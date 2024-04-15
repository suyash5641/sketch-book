"use client";
import { changeBrushSize, changeColor } from "@/app/slice/toolBoxSlice";
import { MENU_ITEMS, TOOLCOLORS } from "@/app/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ToolBox.module.css";
import { Stack, Typography } from "@mui/material";

export const ToolBox = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state: any) => state.menu.activeMenuItem);
  const isShowStrokeToolOption = useSelector(
    (state: any) => state?.menu?.showStrokeToolOption
  );
  const isShowBrushToolOption = useSelector(
    (state: any) => state?.menu?.showBrushToolOption
  );

  const showToggle = useSelector((state: any) => state?.menu?.showToggle);

  // const { isShowStrokeToolOption, isShowBrushToolOption } = useSelector(
  //   (state: any) => state?.menu
  // );

  // const showStrokeToolOption =
  //   (isShowStrokeToolOption
  //     ? activeMenuItem === MENU_ITEMS.PENCIL
  //     : isShowStrokeToolOption) ?? activeMenuItem === MENU_ITEMS.PENCIL;

  // const showBrushToolOption =
  //   isShowBrushToolOption ??
  //   (activeMenuItem === MENU_ITEMS.PENCIL ||
  //     activeMenuItem === MENU_ITEMS.ERASER);
  const showStrokeToolOption =
    showToggle && activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    showToggle &&
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

  // useEffect(() => {
  //   console.log(isShowBrushToolOption, isShowStrokeToolOption, "test");
  // }, [isShowBrushToolOption, isShowStrokeToolOption]);
  console.log("tool", {
    showBrushToolOption: showBrushToolOption,
    isShowBrushToolOption: isShowBrushToolOption,
    showStrokeToolOption: showStrokeToolOption,
    activeMenuItem,
    showToggle: showToggle,
  });

  // console.log(
  //   isShowBrushToolOption,
  //   isShowStrokeToolOption,
  //   activeMenuItem,
  //   MENU_ITEMS.PENCIL,
  //   "test",
  //   showStrokeToolOption,
  //   showBrushToolOption
  // );

  return (
    <Stack className={styles.toolboxContainer}>
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
