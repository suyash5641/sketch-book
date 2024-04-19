import { useState, useRef } from "react";

const useCanvas = () => {
  const [color, setColor] = useState<string>("black");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const drawing = useRef(false);
  const drawHistory = useRef<ImageData[]>([]);
  const historyPointer = useRef(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [draw, setIsDraw] = useState<boolean>(true);

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
      setIsDraw(false);
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

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
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
