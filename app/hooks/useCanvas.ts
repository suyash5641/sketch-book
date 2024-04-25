import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DRAWING_TYPE } from "../utils/constant";
import { drawShape } from "../slice/menuItemSlice";
import { Rectangle, Line } from "../interface/interface";

const useCanvas = () => {
  const { drawingType, activeMenuItem, actionMenuItem } = useSelector(
    (state: any) => state?.menu
  );
  const { strokeColor, size } = useSelector(
    (state: any) => state?.toolbox[activeMenuItem]
  );
  const [color, setColor] = useState<string>("black");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const drawing = useRef<boolean>(false);
  const drawHistory = useRef<ImageData[]>([]);
  const historyPointer = useRef(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [draw, setIsDraw] = useState<boolean>(true);
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [prevStartX, setPrevStartX] = useState<number>(0);
  const [prevStartY, setPrevStartY] = useState<number>(0);
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const isDownRef = useRef<boolean>(false);
  const lines = useRef<Line[]>([]);
  const dispatch = useDispatch();

  const drawOval = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !startXRef.current || !startYRef.current) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ReDrawCanvas();
    ctx.beginPath();
    ctx.moveTo(
      startXRef.current,
      startYRef.current + (y - startYRef.current) / 2
    );
    ctx.bezierCurveTo(
      startXRef.current,
      startYRef.current,
      x,
      startYRef.current,
      x,
      startYRef.current + (y - startYRef.current) / 2
    );
    ctx.bezierCurveTo(
      x,
      y,
      startXRef.current,
      y,
      startXRef.current,
      startYRef.current + (y - startYRef.current) / 2
    );
    ctx.closePath();
    ctx.stroke();
  };

  const handleCircleMouseDown = (e: any) => {
    if (!canvasRef.current) return;
    const canvasOffset = canvasRef.current.getBoundingClientRect();
    startXRef.current = e.clientX ?? e.touches[0]?.clientX - canvasOffset.left;
    startYRef.current = e.clientY ?? e.touches[0]?.clientY - canvasOffset.top;
    isDownRef.current = true;
  };

  const handleCircleMouseMove = (e: any) => {
    if (
      !isDownRef.current ||
      !canvasRef.current ||
      !ctx.current ||
      !startXRef.current ||
      !startYRef.current
    )
      return;

    const canvasOffset = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX ?? e.touches[0]?.clientX - canvasOffset.left;
    const mouseY = e.clientY ?? e.touches[0]?.clientY - canvasOffset.top;
    drawOval(mouseX, mouseY);
  };

  const handleCircleMouseUp = () => {
    if (!isDownRef.current) return;

    isDownRef.current = false;
    if (canvasRef?.current) {
      const imageData = canvasRef?.current
        ?.getContext("2d")
        ?.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      if (imageData) {
        drawHistory.current.push(imageData);
        historyPointer.current = drawHistory.current.length - 1;
      }
    }
  };

  const handleRectangleMouseDown = (e: any) => {
    if (!canvasRef.current) return;
    const offsetX = canvasRef.current.offsetLeft;
    const offsetY = canvasRef.current.offsetTop;

    setStartX(
      parseInt((e.clientX ?? e.touches[0]?.clientX - offsetX).toString())
    );
    setStartY(
      parseInt((e.clientY ?? e.touches[0]?.clientY - offsetY).toString())
    );
    setIsDown(true);
  };

  const handleRectangleMouseUp = (e: any) => {
    const c = canvasRef.current;
    const ctx = canvasRef?.current?.getContext("2d");
    if (!c || !ctx) return;

    e.preventDefault();
    e.stopPropagation();

    if (isDown) {
      const offsetX = c.offsetLeft;
      const offsetY = c.offsetTop;

      const mouseX = parseInt(
        (e.clientX ?? e.touches[0]?.clientX - offsetX).toString()
      );
      const mouseY = parseInt(
        (e.clientY ?? e.touches[0]?.clientY - offsetY).toString()
      );

      const width = mouseX - startX;
      const height = mouseY - startY;

      const newRectangle = {
        x: startX,
        y: startY,
        width: width,
        height: height,
      };

      if (canvasRef.current) {
        const imageData = ctx.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        drawHistory.current.push(imageData);
        historyPointer.current = drawHistory.current.length - 1;
      }

      setRectangles((prevRectangles) => [...prevRectangles, newRectangle]);
      setIsDown(false);
    }
  };

  const handleRectangleMouseMove = (e: any) => {
    const ctx = canvasRef?.current?.getContext("2d");
    if (!canvasRef.current || !ctx) return;

    if (!isDown) return;

    const offsetX = canvasRef.current.offsetLeft;
    const offsetY = canvasRef.current.offsetTop;

    const mouseX = parseInt(
      (e.clientX ?? e.touches[0]?.clientX - offsetX).toString()
    );
    const mouseY = parseInt(
      (e.clientY ?? e.touches[0]?.clientY - offsetY).toString()
    );

    const width = mouseX - startX;
    const height = mouseY - startY;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ReDrawCanvas();
    // Draw the new rectangle
    ctx.strokeRect(startX, startY, width, height);
  };

  const handleLineMouseDown = (e: any) => {
    if (!canvasRef.current) return;

    const offsetX = canvasRef.current.offsetLeft;
    const offsetY = canvasRef.current.offsetTop;

    setPrevStartX(
      parseInt((e.clientX ?? e.touches[0]?.clientX - offsetX).toString())
    );
    setPrevStartY(
      parseInt((e.clientY ?? e.touches[0]?.clientY - offsetY).toString())
    );
    setIsDown(true);
  };

  const handleLineMouseUp = (e: any) => {
    const contextRef = canvasRef.current;
    const ctx = canvasRef?.current?.getContext("2d");
    if (!contextRef || !ctx) return;

    if (isDown) {
      const offsetX = contextRef.offsetLeft;
      const offsetY = contextRef.offsetTop;
      const endX = parseInt(
        (e.clientX ?? e.touches[0]?.clientX - offsetX).toString()
      );
      const endY = parseInt(
        (e.clientY ?? e.touches[0]?.clientY - offsetY).toString()
      );

      const newLine = {
        startX: prevStartX,
        startY: prevStartY,
        endX: endX,
        endY: endY,
        color: color,
      };

      lines.current.push(newLine);
      setIsDown(false);
      drawing.current = false;
      if (canvasRef.current) {
        const imageData = ctx.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        drawHistory.current.push(imageData);
        historyPointer.current = drawHistory.current.length - 1;
      }
    }
  };

  const handleLineMouseMove = (e: any) => {
    const ctx = canvasRef?.current?.getContext("2d");
    if (!canvasRef.current || !ctx) return;

    if (!isDown) return;

    const offsetX = canvasRef.current.offsetLeft;
    const offsetY = canvasRef.current.offsetTop;

    const endX = parseInt(
      (e.clientX ?? e.touches[0]?.clientX - offsetX).toString()
    );
    const endY = parseInt(
      (e.clientY ?? e.touches[0]?.clientY - offsetY).toString()
    );

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ReDrawCanvas();
    ctx.beginPath();
    ctx.moveTo(prevStartX, prevStartY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.stroke();
  };

  const handleMouseDown = (event: any) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (ctx.current) {
      ctx.current.beginPath();
      ctx.current.moveTo(
        offsetX ?? event.touches[0]?.clientX,
        offsetY ?? event.touches[0]?.clientY
      );
      drawing.current = true;
    }
  };

  const handleMouseMove = (event: any) => {
    if (!drawing.current || !canvasRef.current) return;
    const { offsetX, offsetY } = event.nativeEvent;
    if (ctx.current) {
      ctx.current.lineTo(
        offsetX ?? event.touches[0]?.clientX,
        offsetY ?? event.touches[0]?.clientY
      );
      ctx.current.stroke();
    }
  };

  const undo = () => {
    if (ctx.current && historyPointer.current > 0) {
      if (historyPointer.current > 0) historyPointer.current -= 1;

      const imageData = drawHistory.current[historyPointer.current];
      ctx.current.putImageData(imageData, 0, 0);
    } else if (ctx.current && historyPointer.current === 0) {
      const imageData = drawHistory.current[historyPointer.current];
      ctx.current.putImageData(imageData, 0, 0);
    }
  };

  const ReDrawCanvas = () => {
    if (ctx.current && historyPointer.current > 0) {
      const imageData = drawHistory.current[historyPointer.current];
      ctx.current.putImageData(imageData, 0, 0);
    }
  };

  const erase = () => {
    if (ctx.current) {
      setIsDraw(false);
      dispatch(drawShape("FREEHAND"));
    }
  };

  const Draw = () => {
    if (ctx.current) {
      setIsDraw(true);
      ctx.current.strokeStyle = strokeColor;
    }
  };

  const redo = () => {
    if (ctx.current) {
      if (historyPointer.current < drawHistory.current.length - 1)
        historyPointer.current += 1;
      const imageData = drawHistory.current[historyPointer.current];
      ctx.current.putImageData(imageData, 0, 0);
    }
  };

  const handleMouseUp = () => {
    drawing.current = false;
    if (canvasRef.current && ctx.current) {
      const imageData = ctx.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
      setIsDrawing(false);
    }
  };

  const getInitialData = () => {
    if (canvasRef.current && ctx.current && drawHistory.current.length === 0) {
      const imageData = ctx.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
      setIsDrawing(false);
    }
  };

  const saveCanvasAsImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const image = new Image();
      image.src = canvas.toDataURL("image/png");

      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas?.getContext("2d");
      if (!tempCtx) return;

      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      // Draw a white background
      tempCtx.fillStyle = "white";
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      // Draw the image on top of the white background
      image.onload = () => {
        tempCtx.drawImage(image, 0, 0);

        const link = document.createElement("a");
        link.href = tempCanvas.toDataURL("image/png");
        link.download = "canvas_image.png";
        link.click();
      };
    }
  };

  const selectMouseDown = (e: any) => {
    switch (drawingType) {
      case DRAWING_TYPE.LINE:
        handleLineMouseDown(e);
        break;
      case DRAWING_TYPE.FREEHAND:
        handleMouseDown(e);
        break;
      case DRAWING_TYPE.SHAPE:
        handleRectangleMouseDown(e);
        break;
      case DRAWING_TYPE.CIRCLE:
        handleCircleMouseDown(e);
        break;
      default:
        break;
    }
  };

  const selectMouseUp = (e: any) => {
    switch (drawingType) {
      case DRAWING_TYPE.LINE:
        handleLineMouseUp(e);
        break;
      case DRAWING_TYPE.FREEHAND:
        handleMouseUp();
        break;
      case DRAWING_TYPE.SHAPE:
        handleRectangleMouseUp(e);
        break;
      case DRAWING_TYPE.CIRCLE:
        handleCircleMouseUp();
        break;
      default:
        break;
    }
  };

  const selectMouseMove = (e: any) => {
    switch (drawingType) {
      case DRAWING_TYPE.LINE:
        handleLineMouseMove(e);
        break;
      case DRAWING_TYPE.FREEHAND:
        handleMouseMove(e);
        break;
      case DRAWING_TYPE.SHAPE:
        handleRectangleMouseMove(e);
        break;
      case DRAWING_TYPE.CIRCLE:
        handleCircleMouseMove(e);
        break;
      default:
        break;
    }
  };

  return {
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
    drawHistory,
    ctx,
    Draw,
    getInitialData,
    color,
    activeMenuItem,
    actionMenuItem,
    strokeColor,
    size,
  };
};
export default useCanvas;
