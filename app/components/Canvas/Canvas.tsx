"use client";
import useCanvas from "@/app/hooks/useCanvas";
import { actionItemClick } from "@/app/slice/menuItemSlice";
import { MENU_ITEMS } from "@/app/utils/constant";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

export const Canvas = () => {
  const dispatch = useDispatch();
  const { activeMenuItem, actionMenuItem } = useSelector(
    (state: any) => state?.menu
  );
  const { strokeColor, size } = useSelector(
    (state: any) => state?.toolbox[activeMenuItem]
  );

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    saveCanvasAsImage,
    undo,
    redo,
    draw,
    erase,
    canvasRef,
    ctx,
    Draw,
    getInitialData,
    color,
  } = useCanvas();

  useEffect(() => {
    if (!canvasRef.current) return;
    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      saveCanvasAsImage();
    } else if (actionMenuItem === MENU_ITEMS.UNDO) {
      undo();
    } else if (actionMenuItem === MENU_ITEMS.REDO) {
      redo();
    } else if (activeMenuItem === MENU_ITEMS.PENCIL) {
      Draw();
    } else if (activeMenuItem === MENU_ITEMS.ERASER) {
      erase();
    }

    dispatch(actionItemClick(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionMenuItem, canvasRef, activeMenuItem]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    context.strokeStyle = strokeColor;
    context.lineWidth = size;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokeColor, size]);

  useLayoutEffect(() => {
    const canvas = canvasRef?.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = color;
    ctx.current = context;
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        style={{
          width: "100%", // Ensure the div takes up the full width of its parent
          height: "100vh", // Ensure the div takes up the full height of the viewport
          overflow: "hidden", // Prevent scrolling
          display: "flex", // Optional: use flexbox for layout
          alignItems: "center", // Optional: vertically center the canvas
          justifyContent: "center", // Optional: horizontally center the canvas
        }}
      >
        <canvas
          style={{
            touchAction: "none",
            imageRendering: "pixelated",
            // border: "4px solid red",
          }}
          className="test"
          ref={canvasRef}
        ></canvas>
      </div>
    </>
  );
};
