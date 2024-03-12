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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (ctx.current) {
      ctx.current.beginPath();
      ctx.current.moveTo(offsetX, offsetY);
      drawing.current = true;
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!drawing.current) return;

    const { offsetX, offsetY } = event.nativeEvent;
    if (ctx.current) {
      ctx.current.lineTo(offsetX, offsetY);
      ctx.current.stroke();
    }
  };

  const handleMouseUp = () => {
    drawing.current = false;
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
