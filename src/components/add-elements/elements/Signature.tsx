import React, { useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import { getFontSize } from "../../../helpers/getFontSize";
import { pxStringToNumber } from "../../../helpers/pxStringToNumber";

interface IProps {
  width: number;
  height: number;
  x: number;
  y: number;
  index: number;
  id: string;
  name: string;
  setUpdatingElement(val: boolean): void;
  backgroundColor?: string;
  toggleSettings(val?: string): void;
  updateElemet(values: any, id?: string): void;
  scale: number;
}
const Signature: React.FC<IProps> = ({
  width,
  height,
  x,
  y,
  id,
  name,
  setUpdatingElement,
  backgroundColor = "#84CBFF",
  toggleSettings,
  updateElemet,
  scale,
}) => {
  const fontSize = useRef(10);
  useEffect(() => {
    fontSize.current = getFontSize(width, height, name.length) - 8;
  }, []);

  const setUpdatingOn = () => {
    setUpdatingElement(true);
  };

  const setUpdatingOff = () => {
    setUpdatingElement(false);
  };

  return (
    <Rnd
      // default={{ x, y, width, height }}
      scale={scale}
      position={{ x, y }}
      size={{ width, height }}
      onMouseDown={setUpdatingOn}
      onResizeStart={(e) => {
        e.stopPropagation();
        setUpdatingOn();
      }}
      onDragStop={(e, d) => {
        if (!(d.x === x && d.y === y)) {
          updateElemet({ x: d.x, y: d.y }, id);
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setUpdatingOff();
        setUpdatingOff();
        const uWidth = pxStringToNumber(ref.style.width);
        const uHeight = pxStringToNumber(ref.style.height);
        fontSize.current = getFontSize(uWidth, uHeight, name.length) - 8;
        updateElemet(
          {
            width: uWidth,
            height: uHeight,
          },
          id
        );
      }}
      bounds="parent"
    >
      <div
        onDoubleClick={() => toggleSettings(id)}
        onMouseUp={setUpdatingOff}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor,
          color: "black",
          fontWeight: "bold",
          border: "2px solid black",
          fontSize: fontSize.current,
          lineHeight: fontSize.current + "px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          overflow: "hidden",
        }}
      >
        {name}
      </div>
    </Rnd>
  );
};
export default Signature;
