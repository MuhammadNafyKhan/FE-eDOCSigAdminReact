import React, { useState } from "react";
import "./Sidebar.css";
import { EElementTypes } from "../../../pages/AddElements";
import { colors } from "../../../constants";

interface IProps {
  sidebarCollapsed: boolean;
  toggleSidebar(): void;
  setSelected(val: string): void;
  selected: string;
  selectedUser: {
    index: number;
    value: string;
  };
}

const Sidebar: React.FC<IProps> = (props) => {
  const [showOption, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOption);
  };

  const offShowOptions = () => {
    setShowOptions(false);
  };

  const getClasses = (name: string | string[]) => {
    if (typeof name === "string") {
      if (props.selected === name) {
        return "mt-3 element_icon element_icon-selected";
      }
      return "mt-3 element_icon";
    }
    const found = name.find((n) => n === props.selected);
    if (found) {
      return "mt-3 element_icon element_icon-selected";
    }
    return "mt-3 element_icon";
  };

  const getStyles = (name: string | string[]) => {
    if (typeof name === "string") {
      if (props.selected === name) {
        return {
          color: "white",
          backgroundColor: colors[props.selectedUser.index],
        };
      }
      return { color: colors[props.selectedUser.index] };
    }
    const found = name.find((n) => n === props.selected);
    if (found) {
      return {
        color: "white",
        backgroundColor: colors[props.selectedUser.index],
      };
    }
    return { color: colors[props.selectedUser.index] };
  };

  return (
    <div style={{ overflowX: "visible" }}>
      <div
        // onClick={props.toggleSidebar}
        className="element_sidebar_header-icon-container"
        style={{ display: props.sidebarCollapsed ? "inline-block" : "none" }}
      >
        <i className="fa-solid fa-angles-right sidebar_icon" />
      </div>

      <div
        className="element_sidebar_header-icon-container"
        style={{ display: props.sidebarCollapsed ? "none" : "inline-block" }}
      >
        <div
        // onClick={props.toggleSidebar}
        >
          <i className="fa-solid fa-angles-left sidebar_icon" />
        </div>
      </div>

      <div className="elements_conatiner">
        <p
          className={getClasses(EElementTypes.SIGNATURE)}
          style={getStyles(EElementTypes.SIGNATURE)}
          onClick={() => {
            if (props.selected === EElementTypes.SIGNATURE) {
              props.setSelected("");
            } else {
              props.setSelected(EElementTypes.SIGNATURE);
            }
            offShowOptions();
          }}
        >
          <i className="fak fa-sigicon " title="Add Signature Box" />
        </p>
        <p
          className={getClasses(EElementTypes.INITIALBOX)}
          style={getStyles(EElementTypes.INITIALBOX)}
        >
          <span
            className="icon fa-layers fa-fw"
            title="Add Initials Box"
            onClick={() => {
              if (props.selected === EElementTypes.INITIALBOX) {
                props.setSelected("");
              } else {
                props.setSelected(EElementTypes.INITIALBOX);
              }

              offShowOptions();
            }}
          >
            <i className="fal fa-square"></i>
            <i
              className="fa-layers-text pe-1"
              data-fa-transform="shrink-4"
              style={{ fontStyle: "italic" }}
            >
              i.i
            </i>
          </span>
        </p>
        <div className="time_options_container">
          {showOption && (
            <div className="time_options">
              <p
                className="time_option"
                onClick={() => {
                  if (props.selected === EElementTypes.DATEPICKER) {
                    props.setSelected("");
                  } else {
                    props.setSelected(EElementTypes.DATEPICKER);
                  }
                  offShowOptions();
                }}
              >
                Date Picker
              </p>
              <hr className="line_break" />
              <p
                className="time_option"
                onClick={() => {
                  if (props.selected === EElementTypes.DATESIGNED) {
                    props.setSelected("");
                  } else {
                    props.setSelected(EElementTypes.DATESIGNED);
                  }
                  offShowOptions();
                }}
              >
                Date Signed
              </p>
            </div>
          )}
          <p
            className={getClasses([
              EElementTypes.DATESIGNED,
              EElementTypes.DATEPICKER,
            ])}
            style={getStyles([
              EElementTypes.DATESIGNED,
              EElementTypes.DATEPICKER,
            ])}
          >
            <span onClick={toggleOptions}>
              <i className="far fa-calendar-days" title="Add Date Box" />
            </span>
          </p>
        </div>
        <p
          className={getClasses(EElementTypes.TEXTBOX)}
          style={getStyles(EElementTypes.TEXTBOX)}
        >
          <span
            className="icon fa-layers fa-fw"
            title="Add Text Box"
            onClick={() => {
              if (props.selected === EElementTypes.TEXTBOX) {
                props.setSelected("");
              } else {
                props.setSelected(EElementTypes.TEXTBOX);
              }
              offShowOptions();
            }}
          >
            <i className="fal fa-square"></i>
            <i className="fal fa-text" data-fa-transform="shrink-5"></i>
          </span>
        </p>
        <p
          className={getClasses(EElementTypes.MEMO)}
          style={getStyles(EElementTypes.MEMO)}
          onClick={() => {
            if (props.selected === EElementTypes.MEMO) {
              props.setSelected("");
            } else {
              props.setSelected(EElementTypes.MEMO);
            }
            offShowOptions();
          }}
        >
          <span className="fa-light fa-memo-pad" title="Add Memo"></span>
        </p>
        <p
          className={getClasses(EElementTypes.CHECKBOx)}
          style={getStyles(EElementTypes.CHECKBOx)}
          onClick={() => {
            if (props.selected === EElementTypes.CHECKBOx) {
              props.setSelected("");
            } else {
              props.setSelected(EElementTypes.CHECKBOx);
            }
            offShowOptions();
          }}
        >
          <span
            className="fa-light fa-square-check"
            title="Add Check Box"
          ></span>
        </p>
        <p
          className={getClasses(EElementTypes.RADIOBOX)}
          style={getStyles(EElementTypes.RADIOBOX)}
          onClick={() => {
            if (props.selected === EElementTypes.RADIOBOX) {
              props.setSelected("");
            } else {
              props.setSelected(EElementTypes.RADIOBOX);
            }
            offShowOptions();
          }}
        >
          <span className="far fa-circle-dot" title="Add Radio Box"></span>
        </p>
        <p
          className={getClasses(EElementTypes.LIST)}
          style={getStyles(EElementTypes.LIST)}
          onClick={() => {
            if (props.selected === EElementTypes.LIST) {
              props.setSelected("");
            } else {
              props.setSelected(EElementTypes.LIST);
            }
            offShowOptions();
          }}
        >
          <i
            className="fa-regular fa-square-caret-down"
            title="Add List Box"
          ></i>
        </p>
      </div>
    </div>
  );
};
export default Sidebar;
