import React, { useEffect, useState } from "react";
import { IParticipants } from "../../../interface";
import Participant from "../Particpant";
import "./style.css";

interface IProps {
  sidebarCollapsed: boolean;
  participants: IParticipants[];
  total: number;
  toggleSidebar(): void;
  updateTotalParticipant(val?: any): void;
}

const Sidebar: React.FC<IProps> = (props) => {
  const [participant, setParticipant] = useState<IParticipants[]>([]);
  const { total, updateTotalParticipant } = props;

  useEffect(() => {
    setParticipant(props.participants);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const initialValues: IParticipants = {
    display_name: "",
    fullname: "",
    signing_order: "0",
    email: "",
    text_number: "",
    notification_type: "No Email",
    auth_code: "",
    id_check: "None",
    allow_delegation: "no",
    key: "0",
    account: "",
  };

  const addParticipant = () => {
    const clone: IParticipants = {
      ...initialValues,
      key: new Date().getTime().toString(),
    };
    clone.display_name = "Signer " + (participant.length + 1);
    const arr = [...participant, clone];
    updateTotalParticipant();
    setParticipant(arr);
  };

  const removeParticipant = (index: number) => {
    return () => {
      const arr = [...participant];
      arr.splice(index, 1);
      setParticipant(arr);
    };
  };

  return (
    <div>
      <div
        onClick={props.toggleSidebar}
        className="sidebar_header-icon-container"
        style={{ display: props.sidebarCollapsed ? "inline-block" : "none" }}
      >
        <i className="fa-solid fa-angles-right sidebar_icon" />
      </div>

      <div
        className="sidebar_header-container"
        style={{ display: props.sidebarCollapsed ? "none" : "grid" }}
      >
        <div className="sidebar_header">
          <p>Participants</p>
          <div onClick={addParticipant}>
            <i className="fa-solid fa-user-plus sidebar_icon" />
          </div>
        </div>
        <div onClick={props.toggleSidebar}>
          <i className="fa-solid fa-angles-left sidebar_icon" />
        </div>
      </div>

      <div className="participants_conatiner">
        {participant.map((p, i) => {
          return (
            <Participant
              index={i}
              key={p.key}
              participantKey={p.key}
              participant={p}
              removeParticipant={removeParticipant(i)}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Sidebar;
