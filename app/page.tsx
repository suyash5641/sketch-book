// "use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useCallback, useRef, useState } from "react";
import { Canvas } from "./components/Canvas/Canvas";

export default function Home() {
  // const [color, setColor] = useState<string>("red");

  // const erase = useCallback(() => {
  //   setColor("white");
  // }, []);

  // const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* <div>
        <button>Save</button>
      </div> */}
      <Canvas color={"red"} />
    </div>
  );
}
