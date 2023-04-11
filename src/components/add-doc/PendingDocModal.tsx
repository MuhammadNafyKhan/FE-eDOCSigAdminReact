import Modal from "../general/Modal";
import React, { useEffect, useState } from "react";
import { Loader } from "../general/Loader";
import { ApiService } from "../../services/apiService";
import { connect } from "react-redux";
import { IStoreState } from "../../reducers";
import {
  IPendingDoc,
  IApiUser,
  IComparingTemp,
  IApiSigboxTemplate,
} from "../../interface";
import { identifyPDF } from "../../helpers/formIdentify";

interface IProps {
  session: string | null;
  user: IApiUser | undefined;
  host: string;
  type?: string;
  loader: boolean;
  comparingTemps?: IComparingTemp[];
  total?: number;
  onClose(): void;
  onChoosePendingDoc(arr: any[], applyTemp: boolean): void;
  updatePendingDocSettings?: (
    maxx: number,
    maxy: number,
    index: number,
    total: number,
    rawEls: IApiSigboxTemplate[],
    tempId: string
  ) => void;
}
const PendingDocModal: React.FC<IProps> = ({
  type,
  host,
  session,
  user,
  comparingTemps,
  total,
  onClose,
  onChoosePendingDoc,
  updatePendingDocSettings,
}) => {
  const [pendingDocs, setPendingDocs] = useState<IPendingDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [deleteDoc, setDeleteDoc] = useState(false);
  const [applyTemp, setApplyTemp] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<string[]>([]);
  const loadDocs = async () => {
    try {
      setLoading(true);
      const res = await ApiService.post("/PENDING/", {
        session,
        controlid: user?.controlid,
        action: "GETLIST",
        host,
      });
      if (res.result) {
        setPendingDocs(res.pendingdocs);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const getDocs = async () => {
    let arr = [];
    setLoadingDoc(true);
    let index = 0;
    for (const doc of selectedDoc) {
      const body = {
        session: session,
        host: host,
        controlid: user?.controlid,
        action: "GET",
        docid: doc,
        putintemp: true,
      };
      const res = await ApiService.post("/PENDING/", body);
      const { docname, file } = res;
      let period = docname.lastIndexOf(".");
      let fileExtension = docname.substring(period + 1);
      const pDoc = {
        display_name: docname,
        uniqnm: file,
        file_extn: fileExtension,
      };

      arr.push(pDoc);
      index++;
    }
    if (deleteDoc) {
      for (const doc of selectedDoc) {
        const body = {
          session: session,
          host: host,
          controlid: user?.controlid,
          action: "DELETE",
          docid: doc,
          putintemp: true,
        };
        ApiService.post("/PENDING/", body);
      }
    }
    setLoadingDoc(false);
    onChoosePendingDoc(arr, applyTemp);
    onClose();
  };

  const handleCheckbox = (val: string) => {
    const foundIndex = selectedDoc.findIndex((s) => s === val);
    const newArr = [...selectedDoc];
    if (foundIndex > -1) {
      newArr.splice(foundIndex, 1);
    } else {
      newArr.push(val);
    }
    setSelectedDoc(newArr);
  };
  const handleDelete = () => {
    setDeleteDoc(!deleteDoc);
  };

  useEffect(() => {
    loadDocs();
    // eslint-disable-next-line
  }, []);

  const toggleApplyTemp = () => {
    setApplyTemp(!applyTemp);
  };

  return (
    <Modal classes="" onClose={onClose} cancelAble={false}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Pending Documents</div>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col py-1">
                Please select pending documents you would like to use:
              </div>
            </div>
            {loading ? (
              <div className="d-flex justify-content-center">
                <Loader />
              </div>
            ) : (
              <div
                style={{
                  border: "1px solid black",
                  width: "100%",
                  padding: "5px",
                }}
              >
                {pendingDocs.map((p) => {
                  return (
                    <div className="form-check cursor" key={p.docid}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={!!selectedDoc.find((s) => s === p.docid)}
                        onChange={() => {
                          handleCheckbox(p.docid);
                        }}
                      />
                      <label
                        className="form-check-label cursor"
                        htmlFor="flexCheckDefault"
                      >
                        {p.docname}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="row">
              <div className="col-sm-6 py-1">
                <div className="ckbxdivpad">
                  <label className="containerCB" style={{ fontSize: "18px" }}>
                    Delete from pending
                    <input
                      defaultChecked={false}
                      type="checkbox"
                      id="DltFrmPndCH"
                      onChange={handleDelete}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              {type === "signing" && (
                <div className="col-sm-6 py-1">
                  <div className="ckbxdivpad" id="ApplyMtTmpDiv">
                    <label className="containerCB" style={{ fontSize: "18px" }}>
                      Apply matching template(s)
                      <input
                        type="checkbox"
                        id="ApplyTmpCH"
                        checked={applyTemp}
                        onChange={toggleApplyTemp}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              disabled={loadingDoc}
              className="btn btn-secondary"
            >
              Close
            </button>
            <button
              disabled={loadingDoc}
              type="button"
              className="btn btn-primary"
              onClick={getDocs}
            >
              {loadingDoc ? <Loader /> : "Select"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { auth } = state;
  const { token: session, user, ip: host } = auth;
  return {
    session,
    user,
    host,
  };
};

export default connect(mapStateToProps)(PendingDocModal);
