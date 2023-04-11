import React from "react";
interface IProps {
  color?: string;
  size?: string;
}
export const Loader: React.FC<IProps> = ({ color, size = "1rem" }) => {
  return (
    <div
      className="spinner-border spinner-border-sm"
      style={{ width: size, color, height: size }}
      role="status"
    ></div>
  );
};
