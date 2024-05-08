import { Canvas } from "./components/Canvas/Canvas";
import { Menu } from "./components/Menu/Menu";
import { ToolBox } from "./components/ToolBox/ToolBox";
import StrokeSelector from "./components/StrokeSelector/StrokeSelector";

export default function Home() {
  return (
    <>
      <Menu />
      <Canvas />
      <ToolBox />
      <StrokeSelector />
    </>
  );
}
