import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DRAWING_TYPE } from "../utils/constant";
import { drawShape } from "../slice/menuItemSlice";
interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
}

const useCanvas = () => {
  const { drawingType } = useSelector((state: any) => state?.menu);
  const [color, setColor] = useState<string>("black");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const drawing = useRef(false);
  const drawHistory = useRef<ImageData[]>([]);
  const historyPointer = useRef(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [draw, setIsDraw] = useState<boolean>(true);
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [prevStartX, setPrevStartX] = useState(0);
  const [prevStartY, setPrevStartY] = useState(0);
  const [prevWidth, setPrevWidth] = useState(0);
  const [prevHeight, setPrevHeight] = useState(0);
  const lines = useRef<Line[]>([]);
  const dispatch = useDispatch();

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

    // ctx.clearRect(startX, startY, prevWidth, prevHeight);

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    // ctx.strokeRect(startX, startY, width, height);

    // rectangles.forEach((rect) => {
    //   ctx.strokeRect(rect?.x, rect.y, rect.width, rect.height);
    // });

    // ctx.strokeRect(startX, startY, width, height);

    // // Update previous values
    // setPrevWidth(width);
    // setPrevHeight(height);
    // ctx.strokeRect(startX, startY, width, height);

    // rectangles.forEach((rect) => {
    //   ctx.strokeRect(rect?.x, rect.y, rect.width, rect.height);
    // });

    // ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    // rectangles.forEach((rect) => {
    //   ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    // });
    drawHistory.current.forEach((index, p) => {
      const imageData = drawHistory.current[p];
      ctx.putImageData(imageData, 0, 0);
    });
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
    const c = canvasRef.current;
    const ctx = canvasRef?.current?.getContext("2d");
    if (!c || !ctx) return;

    if (isDown) {
      const offsetX = c.offsetLeft;
      const offsetY = c.offsetTop;
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
    drawHistory.current.forEach((index, p) => {
      const imageData = drawHistory.current[p];
      ctx.putImageData(imageData, 0, 0);
    });
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

  const erase = () => {
    if (ctx.current) {
      ctx.current.strokeStyle = "white";
      // ctx.current.lineWidth = 10;
      setIsDraw(false);
      dispatch(drawShape("FREEHAND"));
    }
  };

  const Draw = () => {
    if (ctx.current) {
      setIsDraw(true);
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

    // if (canvas) {
    //   const image = new Image();
    //   image.src = canvas.toDataURL("image/png");
    //   const link = document.createElement("a");
    //   link.href = image.src;
    //   link.download = "canvas_image.png";
    //   link.click();
    // }
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

        // Create a download link for the new canvas
        const link = document.createElement("a");
        link.href = tempCanvas.toDataURL("image/png");
        link.download = "canvas_image.png";
        link.click();
      };
    }
  };

  const selectMouseDown = (e: any) => {
    if (drawingType === DRAWING_TYPE.LINE) handleLineMouseDown(e);
    else if (drawingType === DRAWING_TYPE.FREEHAND) handleMouseDown(e);
    if (drawingType === DRAWING_TYPE.SHAPE) handleRectangleMouseDown(e);
  };

  const selectMouseUp = (e: any) => {
    // if (drawingType) {
    //   // handleRectangleMouseUp(e);
    //   handleLineMouseUp(e);
    // } else handleMouseUp();
    if (drawingType === DRAWING_TYPE.LINE) handleLineMouseUp(e);
    else if (drawingType === DRAWING_TYPE.FREEHAND) handleMouseUp();
    if (drawingType === DRAWING_TYPE.SHAPE) handleRectangleMouseUp(e);
  };

  const selectMouseMove = (e: any) => {
    // if (drawingType) {
    //   // handleRectangleMouseMove(e);
    //   handleLineMouseMove(e);
    // } else handleMouseMove(e);
    if (drawingType === DRAWING_TYPE.LINE) handleLineMouseMove(e);
    else if (drawingType === DRAWING_TYPE.FREEHAND) handleMouseMove(e);
    if (drawingType === DRAWING_TYPE.SHAPE) handleRectangleMouseMove(e);
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
  };
};
export default useCanvas;
