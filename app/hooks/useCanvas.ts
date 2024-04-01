import { useState, useRef } from "react";

const useCanvas = () => {
  const [color, setColor] = useState<string>("red");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const drawing = useRef(false);
  // const drawHistory = useRef([]);
  const drawHistory = useRef<ImageData[]>([]);
  const historyPointer = useRef(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [draw, setIsDraw] = useState<boolean>(true);
  const [user, setIsUser] = useState<boolean>(false);

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
      // const rect = canvasRef.current.getBoundingClientRect();
      // console.log(offsetX, offsetY, rect);
    }
    // if (!drawing.current || !canvasRef.current || !ctx.current) return;
    // const canvas = canvasRef.current;
    // const context = ctx.current;
    // const rect = canvas.getBoundingClientRect();
    // const x = event.clientX - rect.left;
    // const y = event.clientY - rect.top;
    // // ctx.current.lineTo(x, y);
    // context.stroke();
    // const canvas = canvasRef.current;
    // const context = ctx.current;
    // if (!canvas || !context || !drawing.current) return;
    // const { offsetX, offsetY } = event.nativeEvent;
    // const canvasRect = canvas.getBoundingClientRect();
    // const x =
    //   (offsetX ?? event.touches[0]?.clientX / canvasRect.width) * canvas.width;
    // const y =
    //   (offsetY ?? event.touches[0]?.clientY / canvasRect.height) *
    //   canvas.height;
    // // context.lineTo(x, y);
    // context.stroke();
    // if (!canvasRef.current) return;
    // const { clientX, clientY } = event.touches ? event.touches[0] : event;
    // const rect = canvasRef.current.getBoundingClientRect();
    // const offsetX = clientX;
    // const offsetY = clientY;
    // if (ctx.current) {
    //   console.log(offsetX, offsetY, "mouse move");
    //   ctx.current.lineTo(offsetX, offsetY);
    //   ctx.current.stroke();
    // }
    // const { clientX, clientY } = event.touches ? event.touches[0] : event;
    // const rect = canvasRef.current.getBoundingClientRect();
    // const offsetX = clientX - rect.left - window.pageXOffset;
    // const offsetY = clientY - rect.top - window.pageYOffset;
    // if (ctx.current) {
    //   // ctx.current.beginPath(); // Start a new path
    //   // ctx.current.moveTo(offsetX, offsetY); // Move to the starting point
    //   ctx.current.lineTo(offsetX, offsetY); // Draw a line to the current point
    //   ctx.current.lineCap = "round"; // Set lineCap to round
    //   ctx.current.lineJoin = "round";
    //   ctx.current.stroke();
    // }
    // if (ctx.current) {
    //   ctx.current.beginPath();
    //   ctx.current.lineCap = "round";
    //   ctx.current.lineJoin = "round";
    //   ctx.current.lineWidth = 20; // Adjust the line width as needed
    //   ctx.current.moveTo(offsetX, offsetY);
    //   ctx.current.lineTo(offsetX, offsetY);
    //   ctx.current.stroke();
    // }
    // if (event.touches && event.touches.length > 1) {
    //   setIsDrawing(false); // Disable drawing when scrolling
    //   return;
    // }
    // const { clientX, clientY } = event.touches ? event.touches[0] : event;
    // const rect = canvasRef.current.getBoundingClientRect();
    // const offsetX = clientX - rect.left - window.pageXOffset;
    // const offsetY = clientY - rect.top - window.pageYOffset;
    // if (ctx.current) {
    //   // Start a new path if drawing is not in progress
    //   if (!isDrawing) {
    //     ctx.current.beginPath();
    //     ctx.current.moveTo(offsetX, offsetY);
    //     setIsDrawing(true);
    //   }
    //   ctx.current.lineTo(offsetX, offsetY);
    //   ctx.current.stroke();
    // }
  };

  const undo = () => {
    console.log(drawHistory, historyPointer.current);
    if (ctx.current && historyPointer.current > 0) {
      // ctx.current.reset();
      // ctx.current.restore();

      if (historyPointer.current > 0) historyPointer.current -= 1;
      // if(historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1
      const imageData = drawHistory.current[historyPointer.current];
      ctx.current.putImageData(imageData, 0, 0);
    } else if (ctx.current && historyPointer.current === 0) {
      // ctx.current.reset();
      // const imageData = new ImageData(0,0,0,0);
      // ctx.current.putImageData(imageData, 0, 0);
      console.log(drawHistory, historyPointer.current, "inside");
      const imageData = drawHistory.current[historyPointer.current];
      ctx.current.putImageData(imageData, 0, 0);
    }
    // } else if (ctx.current && historyPointer.current === 0) {
    //   // ctx.current.reset();
    //   // const imageData = new ImageData(0,0,0,0);
    //   // ctx.current.putImageData(imageData, 0, 0);
    // }
  };

  const erase = () => {
    if (ctx.current) {
      ctx.current.strokeStyle = "white";
      ctx.current.lineWidth = 10;
      setIsDraw(false);
    }
  };

  const Draw = () => {
    if (ctx.current) {
      ctx.current.strokeStyle = "red";
      ctx.current.lineWidth = 5;
      setIsDraw(true);
    }
  };

  const redo = () => {
    // console.log("test", drawing.current);
    // if (!drawing.current) return;

    if (ctx.current) {
      // ctx.current.reset();
      // ctx.current.restore();
      if (historyPointer.current < drawHistory.current.length - 1)
        historyPointer.current += 1;
      const imageData = drawHistory.current[historyPointer.current];
      ctx.current.putImageData(imageData, 0, 0);
    }
  };

  const handleMouseUp = () => {
    drawing.current = false;
    if (canvasRef.current && ctx.current) {
      // const dataURL = canvasRef.current.toDataURL();
      // console.log(dataURL, "url", ctx.current);
      const imageData = ctx.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
      setIsDrawing(false);
      console.log(drawHistory.current.length - 1, "arr");
      // historyPointer.current += 1;
    }
    console.log("mouse up ");
  };

  const getInitialData = () => {
    if (canvasRef.current && ctx.current && drawHistory.current.length === 0) {
      // const dataURL = canvasRef.current.toDataURL();
      // console.log(dataURL, "url", ctx.current);
      const imageData = ctx.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
      setIsDrawing(false);
      console.log(drawHistory.current.length - 1, "initial");
      // historyPointer.current += 1;
    }
  };

  const saveCanvasAsImage = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const image = new Image();
      image.src = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image.src;
      link.download = "canvas_image.png";
      link.click();
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
  };
};
export default useCanvas;
