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
  backgroundColor?: string;
  setUpdatingElement(val: boolean): void;
  toggleSettings(val?: string): void;
  updateElemet(values: any, id?: string): void;
  scale: number;
}
const DateSigned: React.FC<IProps> = ({
  width,
  height,
  x,
  y,
  id,
  backgroundColor = "#84CBFF",
  setUpdatingElement,
  toggleSettings,
  updateElemet,
  scale,
}) => {
  const fontSize = useRef(10);

  useEffect(() => {
    fontSize.current = getFontSize(width, height, 10) - 8;
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
      onResizeStart={setUpdatingOn}
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
        fontSize.current = getFontSize(uWidth, uHeight, 10) - 8;
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
          fontSize: fontSize.current,
          color: "black",
          fontWeight: "bold",
          border: "2px solid black",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div className="d-flex h-100 justify-content-center align-items-center">
          00/00/0000
        </div>
      </div>
    </Rnd>
  );
};
export default DateSigned;
