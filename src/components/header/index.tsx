import React from "react";
import { connect } from "react-redux";
import { logoutRequest } from "../../actions/auth";
import { IStoreState } from "../../reducers";
import "./header.css";
interface IProps {
  logoutRequest(): void;
  header_title: string;
}
const Header: React.FC<IProps> = ({ logoutRequest, header_title }) => {
  return (
    <div className="row w-100 g-0 LoginHeader" id="BlueHeaderRow">
      <div className="col-12">
        <div className="row w-100 justify-content-center">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 text-white p-2">
            <i className="fak fa-sigicon text-white fa-2x cursor fa-pull-left ms-3"></i>
            <strong className="align-middle">eDOCSignature Admin</strong>
          </div>
          <div
            className="col-xl-4 col-lg-3 d-sm-none d-xs-none d-md-none d-lg-block text-center text-white align-self-center"
            id="MenuTitleCell"
            style={{ fontSize: "16px" }}
          >
            {header_title}
          </div>
          <div
            className="col-xl-3 col-lg-2 col-md-4 col-sm-6 align-self-center"
            id="ControlIDSelect"
          ></div>
          <div className="col-xl-1 col-lg-3 col-md-4 col-sm-12">
            <div className="row justify-content-end flex-nowrap">
              <div className="col text-end" id="HelpCell">
                <button
                  type="button"
                  className="helpbutton cursor mt-2 mx-auto"
                >
                  ?
                </button>
              </div>
              <div
                id="LogoutBtn"
                className="cursor col"
                onClick={logoutRequest}
              >
                <i
                  className="fak fa-logout-edoc text-white fa-2x mt-2"
                  title="Logout"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (store: IStoreState) => {
  const { settings } = store;
  const { header_title } = settings;
  return { header_title };
};
export default connect(mapStateToProps, {
  logoutRequest,
})(Header);
