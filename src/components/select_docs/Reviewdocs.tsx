import "./style.css";
import React, { useState, useEffect } from "react";

import { IParticipants, IReviewDoc } from "../../interface";
import {
  createNotification,
  IActionType,
} from "../../helpers/notificationHelper";

interface IProps {
  participants: IParticipants[];
  current_review_doc: number;
  review_docs: IReviewDoc[];
  reviewUser: string[][];
  onSave(): void;
  saveReveiwUser(payload: any): void;
}
const Reviewdocs: React.FC<IProps> = (props) => {
  const { participants } = props;
  const [selectedSharing, setSelectedSharing] = useState<string[]>([]);
  useEffect(() => {
    const newUser = props.reviewUser[props.current_review_doc] || [];
    setSelectedSharing(newUser);
  }, [props.current_review_doc]); // eslint-disable-line react-hooks/exhaustive-deps

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
      props.saveReveiwUser({
        index: props.current_review_doc,
        reviewUser: selectedSharing,
      });
      props.onSave();
    }
  };

  return (
    <div className="sharings_sidebar">
      <div className="sharing_sidebar-text">
        <span>
          Select who can view{" "}
          {props.review_docs[props.current_review_doc].display_name}
        </span>
      </div>
      <div className="d-flex align-items-center border_box">
        <div className="mx-2">
          <button
            className="sharing_sidebar-button shadow"
            onClick={handleSave}
          >
            Next
          </button>
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

export default Reviewdocs;
