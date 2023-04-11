import React from "react";
import Modal from "./Modal";
interface IProps {
  onClose(): void;
  onConfrim(): void;
}
const Confirm: React.FC<IProps> = ({ onClose, onConfrim }) => {
  return (
    <Modal onClose={onClose} classes="w-25 bg-white rounded p-4 shadow">
      <div>
        <span>Signers Not Present</span>
        <hr />
        <span>
          <b>Warning:</b> there are signers who are not present on this
          document. Are you sure you want to continue?
        </span>
        <hr />
        <div className="d-flex justify-content-end p-2">
          <button className="btn btn-primary" onClick={onClose}>
            No
          </button>
          <button className="btn btn-success ms-3" onClick={onConfrim}>
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default Confirm;
