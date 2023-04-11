import Modal from "../general/Modal";
import React from "react";
import { IApiPackage, IApiParticipant } from "../../interface";
import { useState } from "react";
import { ApiService } from "../../services/apiService";
import { Loader } from "../general/Loader";

interface IProps {
  host: string;
  session: string | null;
  controlid: string;
  packages: IApiPackage[];
  onSelect(pkg: IApiPackage, packageParticipants: IApiParticipant[]): void;
  onClose(): void;
  setFieldValue(
    field: string,
    value: any,
    shouldValidate: boolean | undefined
  ): void;
  setFieldTouched(
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ): void;
}
const SelectPackageModal: React.FC<IProps> = ({
  packages,
  host,
  session,
  controlid,
  onClose,
  onSelect,
  setFieldTouched,
  setFieldValue,
}) => {
  const [loader, setLoader] = useState(false);
  const onSelectPackage = (pkg: IApiPackage) => {
    setTimeout(() => {
      setFieldValue("current_package_name", pkg.name, false);
    }, 0);
    setFieldTouched("current_package_name", true, false);
    //onClose();
    loadSigner(pkg);
  };

  const loadSigner = async (pkg: IApiPackage) => {
    try {
      setLoader(true);
      const res = await ApiService.post("/PACKAGES", {
        session,
        controlid,
        action: "SIGNERS",
        host,
        pkgid: pkg.id,
      });
      onSelect(pkg, res.signers);
      setLoader(false);
    } catch (e) {
      setLoader(false);
      onClose();
    }
  };
  return (
    <Modal classes="" onClose={onClose} cancelAble={false}>
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        style={{ minWidth: "800px" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Please select a package</div>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-7 py-1">Package Name</div>
              <div className="col-2 py-1">Created</div>
              <div className="col-3 py-1 text-center">Status</div>
            </div>
            <div
              id="PackageSelectHolder"
              style={{
                overflowY: "auto",
                maxHeight: "45vh",
                overflowX: "hidden",
                borderTop: "solid 1px #BBB",
              }}
            >
              {packages.map((p) => {
                return (
                  <div
                    key={p.id}
                    className="row cursor ReportRow pt-1"
                    onClick={() => {
                      if (!loader) {
                        onSelectPackage(p);
                      }
                    }}
                  >
                    <div className="col-7 py-1 overflow-hidden">
                      <span className="overflow-hidden">{p.name}</span>
                    </div>
                    <div className="col-2 py-1">{p.created}</div>
                    <div className="col-3 text-center py-1">{p.status}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              id="AddToExistingMdlCancelBtn"
              className="btn btn-warning"
              onClick={onClose}
              disabled={loader}
            >
              {loader ? <Loader color="white" /> : "Cancel"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SelectPackageModal;
