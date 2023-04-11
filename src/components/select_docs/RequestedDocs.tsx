import "./style.css";
import React, { useState, useEffect } from "react";
import { IParticipants, IRequestDoc } from "../../interface";
import {
  createNotification,
  IActionType,
} from "../../helpers/notificationHelper";

interface IProps {
  participants: IParticipants[];
  requested_docs: IRequestDoc[];
  current_requested_doc: number;
  requestUser: string[][];
  onSave(): void;
  saveRequestUser(payload: any): void;
}
const Requesteddocs: React.FC<IProps> = (props) => {
  const { participants } = props;
  const [selectedSharing, setSelectedSharing] = useState<string[]>([]);
  useEffect(() => {
    const newUser = props.requestUser[props.current_requested_doc] || [];
    setSelectedSharing(newUser);
  }, [props.current_requested_doc]); // eslint-disable-line react-hooks/exhaustive-deps
  const toggleSharing = (val: string) => {
    const foundIndex = selectedSharing.findIndex((s) => s === val);
    const newArr = [...selectedSharing];
    if (foundIndex > -1) {
      newArr.splice(foundIndex, 1);
    } else {
      newArr.push(val);
    }
    setSelectedSharing(newArr);
  };

  const handleSave = () => {
    if (selectedSharing.length === 0) {
      createNotification(IActionType.error, "one signer is required");
    } else {
      props.saveRequestUser({
        index: props.current_requested_doc,
        requestUser: selectedSharing,
      });
      props.onSave();
    }
  };

  return (
    <div className="sharings_sidebar">
      <div className="sharing_sidebar-text">
        <span>
          Select which signer you are requesting{" "}
          {props.requested_docs[props.current_requested_doc].name} from
        </span>
      </div>
      <div className="d-flex align-items-center border_box">
        <div className="mx-2" onClick={handleSave}>
          <button className="sharing_sidebar-button shadow">Next</button>
        </div>
      </div>
      <div>
        <hr className="shadow" />
      </div>

      <div className="content-container p-1">
        <div className="d-flex align-items-center mt-2">
          <div>
            {participants.map((u, i) => {
              return (
                <div key={i} className="d-flex align-items-center mt-2">
                  <div className="d-flex align-items-center px-1">
                    <input
                      type="checkbox"
                      checked={!!selectedSharing.find((s) => s === u.key)}
                      onChange={() => {
                        toggleSharing(u.key);
                      }}
                    />
                  </div>
                  <div className="sharing_sidebar-name-container">
                    <span className="px-2">{u.fullname}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requesteddocs;
