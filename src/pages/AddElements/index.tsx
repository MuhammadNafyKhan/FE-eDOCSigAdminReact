import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { updateHeaderTitle, updatePDFSettings } from "../../actions/settings";
import CheckBox from "../../components/add-elements/elements/CheckBox";
import DatePicker from "../../components/add-elements/elements/DatePicker";
import DateSigned from "../../components/add-elements/elements/DateSigned";
import InitialBox from "../../components/add-elements/elements/InitialBox";
import List from "../../components/add-elements/elements/List";
import Memo from "../../components/add-elements/elements/Memo";
import RadioBox from "../../components/add-elements/elements/RadioBox";
import Signature from "../../components/add-elements/elements/Signature";
import TextBox from "../../components/add-elements/elements/Textbox";
import Sidebar from "../../components/add-elements/Sidebar";
import "./style.css";

import { throttle } from "../../helpers/throttle";
import Modal from "../../components/general/Modal";
import { IStoreState } from "../../reducers";
import { setElements } from "../../actions/element";
import UpdateForm from "../../components/add-participants/UpdateForm";
import PDF from "../../components/add-participants/PDF";
import { colors, MAX_ZOOM, MIN_ZOOM } from "../../constants/index";
import PDFRightBar from "../../components/general/PDFRightBar";
import { getSingleForm } from "../../actions/form";
import {
  IElement,
  IOptions,
  IParticipants,
  IRequestDoc,
  IReviewDoc,
  ISigningDoc,
} from "../../interface";
import { useNavigate } from "react-router-dom";
import Confirm from "../../components/general/Confirm";

const default_setting: { [key: string]: { width: number; height: number } } = {
  CHECKBOx: { width: 25, height: 25 },
  RADIOBOX: { width: 30, height: 25 },
  INITIALBOX: { width: 100, height: 35 },
  DATEPICKER: { width: 200, height: 35 },
  DATESIGNED: { width: 200, height: 35 },
  LIST: { width: 130, height: 35 },
  MEMO: { width: 325, height: 75 },
  SIGNATURE: { width: 275, height: 35 },
  TEXTBOX: { width: 275, height: 35 },
};

export enum EElementTypes {
  CHECKBOx = "CHECKBOx",
  DATEPICKER = "DATEPICKER",
  DATESIGNED = "DATESIGNED",
  INITIALBOX = "INITIALBOX",
  LIST = "LIST",
  MEMO = "MEMO",
  RADIOBOX = "RADIOBOX",
  SIGNATURE = "SIGNATURE",
  TEXTBOX = "TEXTBOX",
}

interface IProps {
  elements: IElement[][];
  participants: IParticipants[];
  current_doc: number;
  current_review_doc: number;
  totalPages: number[];
  total: number;
  index: number;
  count: number;
  forms: string[];
  current_package_name: string;
  requested_docs: IRequestDoc[];
  review_docs: IReviewDoc[];
  sigining_docs: ISigningDoc[];
  pdf_setted: boolean[];
  singleForm: { fields: { fieldname: string; fieldtype: string }[] };
  updateHeaderTitle(args: any): void;
  setElements(elements: any): void;
  updatePDFSettings(payload: any): void;
  getSingleForm(payload?: any): void;
  maxy: number[];
  maxx: number[];
}

const getElemetByType = (type: string, props: any) => {
  // console.log(props, type);
  switch (type) {
    case EElementTypes.CHECKBOx: {
      return <CheckBox {...props} />;
    }
    case EElementTypes.DATEPICKER: {
      return <DatePicker {...props} />;
    }
    case EElementTypes.DATESIGNED: {
      return <DateSigned {...props} />;
    }
    case EElementTypes.INITIALBOX: {
      return <InitialBox {...props} />;
    }
    case EElementTypes.LIST: {
      return <List {...props} />;
    }
    case EElementTypes.MEMO: {
      return <Memo {...props} />;
    }
    case EElementTypes.RADIOBOX: {
      return <RadioBox {...props} />;
    }
    case EElementTypes.SIGNATURE: {
      return <Signature {...props} />;
    }
    case EElementTypes.TEXTBOX: {
      return <TextBox {...props} />;
    }
    default: {
      return <TextBox {...props} />;
    }
  }
};
const AddElements: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSideBarCollapsed] = useState(false);
  const [selected, setSelected] = useState("");
  const [drawing, setDrawing] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [offSet, setOffset] = useState({ x: 0, y: 0 });
  const [scrollOffset, setScrollOffset] = useState({ x: 0, y: 0 });
  const [updatingElement, setUpdatingElement] = useState(false); //to manage resize and drag while element is selected from sidebar
  const [showSettings, setShowSettings] = useState(false);
  const [settingsFor, setSettingsFor] = useState("");
  const [elementValues, setElementValues] = useState<any>({});
  const [total, setTotal] = useState(0); //to manage ids
  const [currentPage, setCurrentPage] = useState(1);
  const [participantOptions, setParticipantOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [formOptions, setFormOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const [selectionStyle, setSelectionStyle] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
    backgroundColor?: string;
  }>({
    top: -999,
    left: -999,
    width: 0,
    height: 0,
    backgroundColor: colors[0],
  });
  const [elements, setElements] = useState<IElement[]>([]);
  const [zoom, setZoom] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const defaultRef = useRef(default_setting);
  const initialparticipant =
    participantOptions.length > 0
      ? {
          index: 0,
          value: participantOptions[0].value,
          label: participantOptions[0].label,
        }
      : { index: 0, value: "", label: "" };
  const [selectedUser, setSelectedUser] = useState(initialparticipant);
  useEffect(() => {
    let el = props.elements[props.current_doc] || [];
    el = el.map((e) => {
      const index = props.participants.findIndex((p) => p.key === e.signer);
      const backgroundColor = colors[index];
      return { ...e, backgroundColor };
    });
    setElements(el);
    setTotal(props.total);
    const arr = props.participants.map((p) => {
      return { label: p.fullname, value: p.key };
    });
    if (arr.length > 0) {
      setSelectedUser({ ...arr[0], index: 0 });
    }
    setParticipantOptions(arr);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const arrForm = props.forms.map((formName) => {
      return { label: formName, value: formName, type: formName };
    });
    const arr = { label: "", value: "", type: "" };
    const x = [arr, ...arrForm];
    setFormOptions(x);
  }, []);

  useEffect(() => {
    if (settingsFor !== "") {
      const values = elements.find((e) => e.id === settingsFor);
      setElementValues(values);
    } else {
      setElementValues({});
    }
  }, [settingsFor, elements]);

  const getNameLabel = (name: string) => {
    const [first = "", last = ""] = name.split(" ");
    return first.charAt(0) + last.charAt(0);
  };

  const toggleSettings = (value: string = "") => {
    if (typeof value !== "string") {
      setSettingsFor("");
    } else {
      setSettingsFor(value);
    }

    setShowSettings(!showSettings);
  };

  const toggleSidebar = () => {
    setSideBarCollapsed(!sidebarCollapsed);
  };

  const toggleWarning = () => {
    setShowWarning(!showWarning);
  };

  const updateElemet = (values: IElement, id?: string) => {
    const index = elements.findIndex((e) => (id || settingsFor) === e.id);
    if (index > -1) {
      const signerIndex = participantOptions.findIndex(
        (p) => p.value === values.signer
      );
      if (signerIndex > -1) {
        values.backgroundColor = colors[signerIndex % 4];
      }
      const type = elements[index].type;
      const { width, height } = values;
      if (width && height) {
        defaultRef.current[type] = {
          width: values.width,
          height: values.height,
        };
      }

      const newArray = [...elements];
      const newElement = { ...newArray[index], ...values };
      newArray[index] = newElement;
      setElements(newArray);
    }
  };

  const handleDelete = (id?: string) => {
    const index = elements.findIndex((e) => (id || settingsFor) === e.id);
    if (index > -1) {
      const newArr = [...elements];
      newArr.splice(index, 1);
      setElements(newArr);
    }
  };

  const onAdd = (values: any) => {
    const { width = 0, height = 0 } = values;
    if (width === 0 || height === 0) {
      return;
    }
    const clone = [...elements];
    values.name = values.name + total;
    values.id = values.name;
    values.required = true;
    if (values.type === EElementTypes.LIST) {
      values.options = [
        {
          label: "",
          value: "",
        },
      ];
    }
    if (values.type === EElementTypes.TEXTBOX) {
      console.log("vs: ", values);
    }

    clone.push(values);
    setElements(clone);
    setTotal(total + 1);
  };

  useEffect(() => {
    props.updateHeaderTitle({ header_title: "Adding Elements..." });
    return () => {
      props.updateHeaderTitle({ header_title: "" });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const clasess = sidebarCollapsed
    ? "element_container element_container_sidebar_collaped"
    : "element_container";

  const drawElement = (w: number, h: number) => {
    if (updatingElement) {
      return;
    }
    const width = w / zoom;
    const height = h / zoom;
    const x = (start.x - offSet.x + scrollOffset.x) / zoom;
    const y = (start.y - offSet.y + scrollOffset.y) / zoom;
    defaultRef.current[selected] = { width, height };
    onAdd({
      x,
      y,
      width,
      height,
      name: selected,
      type: selected,
      signer: selectedUser.value,
      backgroundColor: colors[selectedUser.index],
      defaultvalue: "",
      checkedvalue: "Y",
      uncheckedvalue: "N",
    });
    setSelectionStyle({
      top: -999,
      left: -999,
      width: 0,
      height: 0,
      backgroundColor: colors[selectedUser.index],
    });
  };

  const getDefaultDir = (type: string) => {
    return defaultRef.current[type];
  };

  useEffect(() => {
    const el = document.getElementById("element_container");
    if (el) {
      setOffset({ x: el.offsetLeft, y: el.offsetTop });
    }
  }, []);

  useEffect(() => {
    const mainElement = document.getElementById("element_container");
    const onScroll = (_e: any) => {
      if (mainElement) {
        const { scrollLeft, scrollTop } = mainElement;
        const currentPage =
          Math.floor(scrollTop / zoom / props.maxy[props.current_doc]) + 1;
        setCurrentPage(currentPage);
        setScrollOffset({ x: scrollLeft, y: scrollTop });
      }
    };
    mainElement?.addEventListener("scroll", onScroll);
    return () => {
      mainElement?.removeEventListener("scroll", onScroll);
    };
  }, [props.maxy, zoom]);

  const handleMouseMove =
    !updatingElement && drawing
      ? throttle((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          const width = Math.abs(e.clientX - start.x) / zoom;
          const height = Math.abs(e.clientY - start.y) / zoom;
          if (width === 0 || height === 0) {
            return;
          }
          const top = (start.y - offSet.y + scrollOffset.y) / zoom;
          const left = (start.x - offSet.x + scrollOffset.x) / zoom;

          setSelectionStyle({
            backgroundColor: colors[selectedUser.index],
            top,
            left,
            width,
            height,
          });
        }, 100)
      : undefined;

  const handleZoomIn = () => {
    const newZoom = zoom + 0.25;
    if (newZoom <= MAX_ZOOM) {
      setZoom(newZoom);
    }
  };

  const handleZoomOut = () => {
    const newZoom = zoom - 0.25;
    if (newZoom >= MIN_ZOOM) {
      setZoom(newZoom);
    }
  };

  const updatePDFSettings = (x: number, y: number, total: number) => {
    if (!props.pdf_setted[props.current_doc]) {
      props.updatePDFSettings({
        index: props.current_doc,
        maxx: x,
        maxy: y,
        total,
      });
    }
  };

  const onConfirm = () => {
    props.setElements({
      index: props.current_doc,
      element: elements,
      total,
    });
    navigate("/app/managepackage");
  };

  const handleNext = () => {
    const addedParticipant: { [key: string]: any } = {};
    for (const element of elements) {
      addedParticipant[element.signer] = element.signer;
    }

    if (Object.keys(addedParticipant).length !== props.participants.length) {
      toggleWarning();
    } else {
      onConfirm();
    }
  };

  const selectSigner = (index: number, p: IOptions) => {
    return () => {
      setSelectedUser({ index, value: p.value, label: p.label });
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.button === 0) {
      if (selected) {
        setDrawing(true);
        setStart({ x: e.clientX, y: e.clientY });
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.button === 0) {
      if (start.x === e.clientX && start.y === e.clientY) {
        const { width, height } = getDefaultDir(selected);
        drawElement(width * zoom, height * zoom);
        setStart({ x: 0, y: 0 });
        setDrawing(false);
        return;
      }
      if (selected) {
        setDrawing(false);
        drawElement(e.clientX - start.x, e.clientY - start.y);
      }
    }
  };

  const { count, sigining_docs, requested_docs, review_docs } = props;

  let file = "";
  if (sigining_docs.length > 0) {
    file = sigining_docs[props.current_doc].uniqnm;
  } else if (review_docs.length > 0) {
    file = review_docs[props.current_review_doc].uniqnm;
  } else {
    return (
      <div className="d-flex justify-content-center">
        <h3>{count > 0 && requested_docs[0].name}</h3>
      </div>
    );
  }

  return (
    <div className={clasess} id="element_main">
      <div className="elements_sidebar">
        <div className="elements_participant_container">
          <div
            className="participant_item-selected shadow"
            style={{ backgroundColor: colors[selectedUser.index] }}
          >
            <span>{getNameLabel(selectedUser.label)}</span>
          </div>
          {participantOptions.map((p, index) => {
            if (selectedUser.index === index) {
              return <div key={index} style={{ display: "none" }}></div>;
            }
            return (
              <div
                className="particpant_item shadow"
                style={{
                  backgroundColor: colors[index],
                  //  display: selectedUser.index === index ? "none" : "flex",
                }}
                key={index}
                onClick={selectSigner(index, p)}
              >
                <span>{getNameLabel(p.label)}</span>
              </div>
            );
          })}
        </div>
        <Sidebar
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
          setSelected={setSelected}
          selected={selected}
          selectedUser={selectedUser}
        />
      </div>
      <div className="elements_header">
        <div className="elements_header_container">
          <div>
            <div className="adjust">
              <span className="fa-layers fa-fw fa-2x">
                <i className="fa fa-folder folder-icon"></i>
                <span className="fa-layers-text w-100 text-white folder-icon-text">
                  {props.count}
                </span>
              </span>
            </div>
            <div className="elements_header_documents">
              <span>
                Document {props.index + 1} of {props.count}
              </span>
            </div>
          </div>
          <div className="name_adjust">
            <h5>Package : {props.current_package_name}</h5>
            <h5>
              Doc Name: {props.sigining_docs[props.current_doc].display_name}
            </h5>
          </div>
          <div className="elements_header_zoom_container">
            <div className="d-flex justify-content-end align-items-center">
              <div className="pt-2" onClick={handleZoomOut}>
                <i className="fa-solid fa-magnifying-glass-minus zoom-icon"></i>
              </div>
              <div>
                <span className="zoom-icon-seprator">|</span>
              </div>
              <div className="pt-2" onClick={handleZoomIn}>
                <i className="fa-solid fa-magnifying-glass-plus zoom-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="element_content" id="element_container">
        <div
          className="elements_content_main"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "0 0",
            maxWidth: props.maxx[props.current_doc],
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <PDF file={file} updatePDFSettings={updatePDFSettings} />
          {elements.map((el) => {
            return getElemetByType(el.type, {
              key: el.id,
              setUpdatingElement,
              showSettings,
              toggleSettings,
              settingsFor,
              updateElemet,
              scale: zoom,
              ...el,
            });
          })}
          <div className="drawing_element" style={{ ...selectionStyle }} />
        </div>
      </div>
      <div className="elements_action">
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={elements.length === 0}
        >
          Next
        </button>
        <p className="mt-1">total : {props.totalPages[props.index]}</p>
      </div>
      <div className="element_rightbar pt-3">
        <div>
          <PDFRightBar file={file} currentPage={currentPage} />
        </div>
      </div>
      {showSettings && (
        <Modal onClose={toggleSettings}>
          <div className="w-100">
            <h4>{settingsFor}</h4>
            <UpdateForm
              closeSettings={toggleSettings}
              updateElemet={updateElemet}
              handleDelete={handleDelete}
              initial={elementValues}
              participantOptions={participantOptions}
              formOptions={formOptions}
              singleForm={props.singleForm}
              elements={elements}
              getSingleForm={props.getSingleForm}
            />
          </div>
        </Modal>
      )}
      {showWarning && <Confirm onClose={toggleWarning} onConfrim={onConfirm} />}
    </div>
  );
};
const mapStateToProps = (store: IStoreState) => {
  const { participant, elements, file, settings, form } = store;
  const { participants } = participant;
  const { element, total } = elements;
  const {
    index,
    pdf_setted,
    current_doc,
    current_review_doc,
    maxy,
    maxx,
    total: totalPages,
  } = settings;
  const {
    count,
    sigining_docs,
    requested_docs,
    review_docs,
    current_package_name,
  } = file;
  const { forms, form: singleForm } = form;
  return {
    current_doc,
    current_review_doc,
    participants,
    elements: element,
    total,
    totalPages,
    index,
    count,
    sigining_docs,
    requested_docs,
    review_docs,
    current_package_name,
    pdf_setted,
    forms,
    singleForm,
    maxy,
    maxx,
  };
};

export default connect(mapStateToProps, {
  updateHeaderTitle,
  setElements,
  updatePDFSettings,
  getSingleForm,
})(AddElements);
