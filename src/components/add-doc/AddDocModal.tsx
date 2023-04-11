import Modal from "../general/Modal";
import React from "react";
interface IProps {
  onClose(): void;
  onTemplateClick(): void;
  onUploadClick(e: any): void;
  onUploadandApplyTemp(e: any): void;
  onPendingDocsClick(e?: any): void;
}
const AddDocModal: React.FC<IProps> = ({
  onClose,
  onTemplateClick,
  onUploadClick,
  onUploadandApplyTemp,
  onPendingDocsClick,
}) => {
  return (
    <Modal classes="" onClose={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content" style={{ fontSize: "18px" }}>
          <div className="modal-header justify-content-center">
            <div className="modal-title">Select a document send method</div>
          </div>
          <div className="modal-body">
            <div
              className="row mb-3 UseDocSm w-100 mx-auto align-items-center"
              id="SendDocPgBtn"
              data-bs-dismiss="modal"
              onClick={(e) => {
                onUploadClick(e as any);
                onClose();
              }}
            >
              <div className="col-1">
                <span className="fas fa-file-upload FASelectMethod fa-2x"></span>
              </div>
              <div className="col-11">Upload a Document</div>
            </div>
            <div
              className="row mb-3 UseTemplateSm w-100 mx-auto align-items-center"
              onClick={(e) => {
                onUploadandApplyTemp(e);
                onClose();
              }}
              data-bs-dismiss="modal"
            >
              <div className="col-1">
                <span className="fas fa-file-invoice FASelectMethod"></span>
              </div>
              <div className="col-11">Upload & Apply Template</div>
            </div>
            <div
              className="row mb-3 UseTemplateSm w-100 mx-auto align-items-center"
              data-bs-dismiss="modal"
              onClick={() => {
                onTemplateClick();
                onClose();
              }}
            >
              <div className="col-1">
                <span className="fas fa-file-invoice FASelectMethod"></span>
              </div>
              <div className="col-11">Send Using a Template</div>
            </div>

            <div
              className="row mb-3 UsePendingDocSm w-100 mx-auto align-items-center"
              id="SendPendDocBtn"
              data-bs-dismiss="modal"
              onClick={() => {
                onPendingDocsClick();
                onClose();
              }}
            >
              <div className="col-1">
                <span className="far fa-file-powerpoint FASelectMethod"></span>
              </div>
              <div className="col-11">Use Pending Doc</div>
            </div>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              className="btn btn-primary"
              id="ChooseSendDocTypeBtn"
              onClick={onClose}
              style={{ backgroundColor: "#0071BC" }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddDocModal;
