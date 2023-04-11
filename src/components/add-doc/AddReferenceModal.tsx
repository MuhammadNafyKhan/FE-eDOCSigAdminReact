import Modal from "../general/Modal";
import React from "react";
interface IProps {
  onClose(): void;
  onTemplateClick(): void;
  onUploadClick(e: any): void;
  onPendingDocsClick(e?: any): void;
}
const AddReferenceModal: React.FC<IProps> = ({
  onClose,
  onTemplateClick,
  onUploadClick,
  onPendingDocsClick,
}) => {
  return (
    <Modal onClose={onClose} classes="">
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content" style={{ fontSize: "18px" }}>
          <div className="modal-header justify-content-center">
            <div className="modal-title">Select method</div>
          </div>
          <div className="modal-body">
            <div
              className="row mb-3 UseDocSm mx-auto w-100"
              onClick={(e) => {
                onUploadClick(e);
                onClose();
              }}
            >
              <div className="col-1 pt-2">
                <span className="fas fa-file-upload FASelectMethod"></span>
              </div>
              <div className="col-11 pt-3">Upload a Document</div>
            </div>
            <div
              className="row mb-3 UseTemplateSm mx-auto w-100"
              onClick={() => {
                onTemplateClick();
                onClose();
              }}
            >
              <div className="col-1 pt-2">
                <span className="fas fa-file-invoice FASelectMethod"></span>
              </div>
              <div className="col-11 pt-3">Use Template Reference</div>
            </div>
            <div
              className="row mb-3 UsePendingDocSm w-100 mx-auto"
              onClick={() => {
                onPendingDocsClick();
                onClose();
              }}
            >
              <div className="col-1 pt-2">
                <span className="far fa-file-powerpoint FASelectMethod"></span>
              </div>
              <div className="col-11 pt-3">Use Pending Doc</div>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                className="btn btn-primary"
                id="ChooseSendDocTypeBtn"
                onClick={onClose}
                style={{ backgroundColor: "#0071BC" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddReferenceModal;
