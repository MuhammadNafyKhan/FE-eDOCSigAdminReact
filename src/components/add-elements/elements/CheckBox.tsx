import React, { useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import { pxStringToNumber } from "../../../helpers/pxStringToNumber";
import { getFontSize } from "../../../helpers/getFontSize";

interface IProps {
  width: number;
  height: number;
  x: number;
  y: number;
  index: number;
  name: string;
  id: string;
  backgroundColor?: string;
  setUpdatingElement(val: boolean): void;
  toggleSettings(val?: string): void;
  updateElemet(values: any, name?: string): void;
  scale: number;
}

const CheckBox: React.FC<IProps> = ({
  width,
  height,
  x,
  y,
  name,
  id,
  backgroundColor = "#84CBFF",
  setUpdatingElement,
  toggleSettings,
  updateElemet,
  scale,
}) => {
  const setUpdatingOn = () => {
    setUpdatingElement(true);
  };

  const setUpdatingOff = () => {
    setUpdatingElement(false);
  };

  const fontSize = useRef(10);

  useEffect(() => {
    fontSize.current = getFontSize(width, height, 1) - 8;
  }, []);

  return (
    <Rnd
      //  default={{ x, y, width, height }}
      scale={scale}
      position={{ x, y }}
      size={{ width, height }}
      onMouseDown={setUpdatingOn}
      onResizeStart={setUpdatingOn}
      onDragStop={(e, d) => {
        if (!(d.x === x && d.y === y)) {
          updateElemet({ x: d.x, y: d.y }, id);
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setUpdatingOff();
        const uWidth = pxStringToNumber(ref.style.width);
        const uHeight = pxStringToNumber(ref.style.height);
        fontSize.current = getFontSize(uWidth, uHeight, 1) - 8;
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
        onDoubleClick={() => {
          toggleSettings(id);
        }}
        onMouseUp={setUpdatingOff}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor,
          color: "black",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: fontSize.current,
          lineHeight: fontSize + "px",
          overflow: "hidden",
        }}
      >
        <span>C</span>
      </div>
    </Rnd>
  );
};
export default CheckBox;
