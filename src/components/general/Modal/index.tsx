import React from "react";
import "./style.css";
interface IProps {
  onClose(): void;
  children: React.ReactElement;
  classes?: string;
  cancelAble?: boolean;
}
const Modal: React.FC<IProps> = ({
  onClose,
  children,
  classes = "bg-white p-4 rounded shadow w-50 m-auto",
  cancelAble = true,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };
  return (
    <div className="modal" onClick={cancelAble ? onClose : undefined}>
      <div className={classes} onClick={handleClick}>
        {children}
      </div>
    </div>
  );
};
export default Modal;
