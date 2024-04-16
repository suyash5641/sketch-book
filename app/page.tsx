// "use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useCallback, useRef, useState } from "react";
import { Canvas } from "./components/Canvas/Canvas";
import { Menu } from "./components/Menu/Menu";
import { ToolBox } from "./components/ToolBox/ToolBox";
import { Toggle } from "./components/Toggle/Toggle";
import PopOver from "./components/Popover/PopOver";
import StrokeSelector from "./components/StrokeSelector/StrokeSelector";
// import Canvas from "./components/Canvas/Canvas";

export default function Home() {
  return (
    // <div style={{ display: "flex", flexDirection: "column" }}>
    <>
      <Canvas />
      <Menu />
      <ToolBox />
      <StrokeSelector />
    </>
  );
}
