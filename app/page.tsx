// "use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useCallback, useRef, useState } from "react";
import { Canvas } from "./components/Canvas/Canvas";
import { Menu } from "./components/Menu/Menu";
// import Canvas from "./components/Canvas/Canvas";

export default function Home() {
  return (
    // <div style={{ display: "flex", flexDirection: "column" }}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Canvas />
      <Menu />
    </div>
  );
}
