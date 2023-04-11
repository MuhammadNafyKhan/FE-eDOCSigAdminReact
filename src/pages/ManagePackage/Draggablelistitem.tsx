import "./managepackage.css";
import { IParticipants } from "../../interface";

export type DraggableListItemProps = {
  item: IParticipants;
};

const DraggableListItem = ({ item }: DraggableListItemProps) => {
  return (
    <div style={{ background: item.color }} className={"participant_details"}>
      <div className="blockname">
        <p className="m-0 text-center">{item.display_name}</p>
      </div>

      <div className={"block_details"}>
        <div className="inputFields mb-3">
          <i className="fa-solid fa-angle-right fa-2xl blue-color"></i>
          <div className="fullname_field d-flex flex-1">
            <i className="fa fa-search fa-border icon_styling" />
            <div className="fieldformatting">
              Full Name
              <div className="value">{item.fullname}</div>
            </div>
          </div>

          <div className="email_field d-flex flex-1">
            <i className="fa fa-search fa-border icon_styling" />
            <div className="fieldformatting">
              Email
              <div className="value">{item.email}</div>
            </div>
          </div>
          <div className="vl"></div>

          <div className="notify_field">
            <div className="notify_field_formatting">
              Notify By
              <div className="value">{item.notification_type}</div>
            </div>
            <div>
              <i className="fa fa-caret-down fa-lg"></i>
            </div>
          </div>

          <div className="auth_field">
            <p>{item.auth_code ? item.auth_code : "Auth"}</p>
          </div>

          <div className="signing_order_field">
            <div className="signing_order_formatting">
              Signing Order:
              <div className="value">{parseInt(item.signing_order) + 1}</div>
            </div>
            <div>
              <i className="fa fa-caret-down fa-lg"></i>
            </div>
          </div>

          <div className="delegate_field">
            <p>Delegate</p>
            <input
              type={"checkbox"}
              checked={item.allow_delegation === "yes"}
            />
          </div>

          <div className="icons">
            <i className="fa-regular fa-message-lines fa-2xl blue-color"></i>
            <i className="fa-solid fa-dollar-sign fa-2xl blue-color"></i>
            <i className="fa-solid fa-key fa-2xl blue-color"></i>
            <i className="fa-solid fa-envelope fa-2xl blue-color"></i>
            <i className="fa-solid fa-link fa-2xl blue-color"></i>
            <i className="fak fa-sigicon fa-2xl blue-color"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DraggableListItem;
