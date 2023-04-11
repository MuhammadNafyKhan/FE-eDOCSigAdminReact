import React from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
interface IProps {
  count: number;
  sigining_docs: number; //length of signing docs
}
const SideBar: React.FC<IProps> = (props) => {
  const location = useLocation();
  const showRoutes = location.pathname !== "/app";
  const isActive = props.sigining_docs !== 0; //isActive for disable link incase of no signing doc
  return (
    <div className="sidebar">
      <div className="sidebar_container">
        <div className="menu">
          <i className="fa-solid fa-bars"></i>
        </div>

        {showRoutes && (
          <div className="w-100">
            <div
              className={
                location.pathname === "/app/addparticipants"
                  ? "link_active"
                  : "link"
              }
            >
              {props.count > 0 && <span className="count">{props.count}</span>}
              <Link to={"/app/addparticipants"}>
                <i className="fa-solid fa-user-plus"></i>
              </Link>
            </div>

            <div
              className={
                location.pathname === "/app/addElements"
                  ? "link_active"
                  : "link"
              }
              style={{ display: isActive ? "inherit" : "none" }}
            >
              <Link to={isActive ? "/app/addElements" : "#"}>
                <i className="fa-solid fa-location-pen "></i>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SideBar;
