"use client";
// import React, { MutableRefObject, useEffect, useRef, useState } from "react";

// export const Canvas: React.FC = () => {
//   const [color, setColor] = useState<string>("red");
//   // const canvasRef = useRef<MutableRefObject>(null);
//   const canvasRef = useRef<HTMLCanvasElement>();

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     if (!canvas) return;
//     const context = canvas.getContext("2d");

//     if (!context) return;
//     canvas.height = window.innerHeight * 2;
//     canvas.width = window.innerWidth * 2;
//     canvas.style.width = `${window.innerWidth}px`;
//     canvas.style.height = `${window.innerHeight}px`;
//     // const context = canvas.getContext("2d");

//     context.strokeWidth = 5;
//     context.scale(2, 2);
//     context.lineCap = "round";
//     context.strokeStyle = color;
//     context.lineWidth = 5;
//     ctx.current = context;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//     >
//       <canvas ref={canvasRef} />
//     </div>
//   );
// };
import React, { useCallback, useEffect, useRef, useState } from "react";
interface IProps {
  color: string;
}

export const Canvas = ({ color }: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const drawing = useRef(false);
  // const drawHistory = useRef([]);
  const drawHistory = useRef<ImageData[]>([]);
  const historyPointer = useRef(0);

  const get = useCallback(async () => {
    // const { email, password } = payload;
    try {
      const payload = {
        email: "suy@gmail.com",
        filename: "mydrawing",
      };
      const response = await fetch("/api/userdrawing", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const res = await response.json();
      return res.image;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getUserCanvas = useCallback(
    async (cont: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const res = await get();
      if (res && cont) {
        var image = new Image();
        image.src = res;

        // Wait for the image to load
        await new Promise((resolve) => {
          image.onload = resolve;
        });

        // Draw the image onto the canvas
        cont.drawImage(image, 0, 0, canvas.width, canvas.height);
        if (canvasRef.current && ctx.current) {
          // const dataURL = canvasRef.current.toDataURL();
          // console.log(dataURL, "url", ctx.current);
          const imageData = cont.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          drawHistory.current.push(imageData);
          historyPointer.current = drawHistory.current.length - 1;
          // historyPointer.current += 1;
        }
      }
    },
    [get]
  );

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    context.lineWidth = 5;
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.fillStyle = "white";
    // context.fillRect(0, 0, canvas.width, canvas.height);

    ctx.current = context;
    getUserCanvas(context, canvas);
    console.log("test user");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (ctx.current) {
      ctx.current.beginPath();
      ctx.current.moveTo(offsetX, offsetY);
      // console.log(offsetX, offsetY, "down");
      drawing.current = true;
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!drawing.current) return;

    const { offsetX, offsetY } = event.nativeEvent;
    if (ctx.current) {
      ctx.current.lineTo(offsetX, offsetY);
      // console.log(offsetX, offsetY, "mouse move", ctx.current);
      ctx.current.stroke();
    }
  };

  const undo = () => {
    // console.log("test", drawing.current);
    // if (!drawing.current) return;

    if (ctx.current) {
      // ctx.current.reset();
      // ctx.current.restore();
      if (historyPointer.current > 0) historyPointer.current -= 1;
      // if(historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1
      const imageData = drawHistory.current[historyPointer.current];
      console.log(
        "test",
        imageData,
        historyPointer.current,
        drawHistory.current
      );
      ctx.current.putImageData(imageData, 0, 0);
      // const imageData = ctx.current.getImageData(0, 0, 100, 100);
      // ctx.current.putImageData(imageData, 231, 80);
      // ctx.current.beginPath();
      // ctx.current.moveTo(231, 121);
      // ctx.current.lineTo(631, 80);
      // ctx.current.stroke();
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
      // historyPointer.current += 1;
    }
    console.log("mouse up ");
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

  const genUrl = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      // Get the base64 URL of the canvas content
      const base64URL = canvas.toDataURL("image/png");

      // Log the base64 URL to the console
      console.log("Base64 URL:", base64URL);
      create(base64URL);
    }
  };

  const createAccountWithEmailPassword = useCallback(async () => {
    // const { email, password } = payload;
    try {
      const payload = {
        email: "suy@gmail.com",
        password: "6636363636",
      };
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const res = await response.json();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const create = useCallback(async (base64URL: string) => {
    // const { email, password } = payload;
    try {
      const payload = {
        email: "suy@gmail.com",
        image: base64URL,
        filename: "mydrawing",
      };
      const response = await fetch("/api/createdata", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const res = await response.json();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button onClick={saveCanvasAsImage}>download</button>
      <button onClick={createAccountWithEmailPassword}>register user</button>
      <button onClick={genUrl}>save </button>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
      <div
        style={{ border: "1px solid red" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <canvas
          // style={{ border: "1px solid blue", width: "100%" }}
          ref={canvasRef}
        ></canvas>
      </div>
    </div>
  );
};
