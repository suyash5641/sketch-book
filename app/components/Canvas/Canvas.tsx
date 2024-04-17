"use client";
import useCanvas from "@/app/hooks/useCanvas";
import { actionItemClick } from "@/app/slice/menuItemSlice";
import { MENU_ITEMS } from "@/app/utils/constant";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

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
    selectMouseDown,
    selectMouseMove,
    selectMouseUp,
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
        // onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        // onTouchStart={handleMouseDown}
        // onTouchMove={handleMouseMove}
        // onTouchEnd={handleMouseUp}
        onMouseDown={selectMouseDown}
        onMouseMove={selectMouseMove}
        onMouseUp={selectMouseUp}
        onTouchStart={selectMouseDown}
        onTouchMove={selectMouseMove}
        onTouchEnd={selectMouseUp}
        style={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <canvas
          style={{
            touchAction: "none",
            imageRendering: "pixelated",
          }}
          className="test"
          ref={canvasRef}
        ></canvas>
      </div>
    </>
  );
};
