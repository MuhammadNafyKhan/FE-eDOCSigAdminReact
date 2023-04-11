import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateHeaderTitle } from "../../actions/settings";
import { updateTotalParticipant } from "../../actions/participant";
import { removeSigner } from "../../actions/file";
import Sidebar from "../../components/add-participants/Sidebar";
import { IStoreState } from "../../reducers";
import { MAX_ZOOM, MIN_ZOOM } from "../../constants/index";
import PDFRightBar from "../../components/general/PDFRightBar";
import PDF from "../../components/add-participants/PDF";
import "./style.css";
import {
  IParticipants,
  IRequestDoc,
  IReviewDoc,
  ISigningDoc,
} from "../../interface";
import { useNavigate } from "react-router-dom";
interface IProps {
  participants: IParticipants[];
  total: number;
  index: number;
  count: number;
  current_package_name: string;
  current_doc: number;
  current_review_doc: number;
  current_requested_doc: number;
  requested_docs: IRequestDoc[];
  review_docs: IReviewDoc[];
  sigining_docs: ISigningDoc[];
  savedCount: number;
  totalPages: number[];
  maxy: number[];
  pdf_setted: boolean[];
  updateTotalParticipant(val?: any): void;
  updateHeaderTitle(args: any): void;
  removeSigner(args?: any): void;
}

const AddParticipant: React.FC<IProps> = (props) => {
  const {
    participants = [],
    total,
    count,
    sigining_docs,
    requested_docs,
    review_docs,
    savedCount,
  } = props;
  const [sidebarCollapsed, setSideBarCollapsed] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSideBarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    props.updateHeaderTitle({ header_title: "Adding Participants..." });
    if (count === 0) {
      navigate(-1);
    }
    return () => {
      props.updateHeaderTitle({ header_title: "" });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const mainElement = document.getElementById("participants_container");
    const onScroll = (_e: any) => {
      if (mainElement) {
        const { scrollTop } = mainElement;
        const currentPage =
          Math.floor(scrollTop / zoom / props.maxy[props.current_doc]) + 1;
        setCurrentPage(currentPage);
      }
    };
    mainElement?.addEventListener("scroll", onScroll);
    return () => {
      mainElement?.removeEventListener("scroll", onScroll);
    };
  }, [props.maxy, zoom]);

  const handleZoomOut = () => {
    const newZoom = zoom - 0.25;
    if (newZoom >= MIN_ZOOM) {
      setZoom(newZoom);
    }
  };

  const handleZoomIn = () => {
    const newZoom = zoom + 0.25;
    if (newZoom <= MAX_ZOOM) {
      setZoom(newZoom);
    }
  };
  const handleCreateDFC = () => {
    // if (props.sigining_docs.length !== 0) {
    //   navigate("/app/addIndexes");
    // } else {
    //   navigate("/app/addSharing");
    // }
    navigate("/app/addElements");
  };

  let file = "";

  let showDoc = true;
  let showReview = true;
  if (sigining_docs.length > 0) {
    file = sigining_docs[props.current_doc].uniqnm;
  } else if (review_docs.length > 0) {
    file =
      review_docs[props.current_review_doc] &&
      review_docs[props.current_review_doc].uniqnm;
    showReview = false;
  } else {
    showReview = false;
    showDoc = false;
  }

  return (
    <div className="participant_container">
      <div className="participants_sidebar">
        <Sidebar
          participants={participants}
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
          updateTotalParticipant={updateTotalParticipant}
          total={total}
        />
      </div>
      {showDoc && showReview && (
        <div className="participants_header">
          <div className="participants_header_container">
            <div>
              <div className="adjust">
                <span className="fa-layers fa-fw fa-2x">
                  <i className="fa fa-folder folder-icon"></i>
                  <span className="fa-layers-text w-100 text-white folder-icon-text">
                    {props.count}
                  </span>
                </span>
              </div>
              <div className="participants_header_documents">
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
            <div className="participants_header_zoom_container">
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
      )}
      {showDoc && showReview && (
        <div className="participants_content" id="participants_container">
          <div
            style={{ transform: `scale(${zoom})`, transformOrigin: "0 0" }}
            className="participants_content_main"
          >
            <PDF file={file} />
          </div>
        </div>
      )}
      <div className="participants_action">
        <button
          className="btn btn-primary"
          disabled={
            savedCount === 0 || savedCount !== props.participants.length
          }
          onClick={handleCreateDFC}
        >
          Next
        </button>
        <p className="mt-1">total : {props.totalPages[props.index]}</p>
      </div>
      <div className="participants_rightbar pt-3">
        {showDoc && showReview && (
          <div>
            <PDFRightBar file={file} currentPage={currentPage} />
          </div>
        )}
      </div>
      {!showDoc && !showReview && (
        <div className="participants_header">
          <div className="d-flex justify-content-center pt-3">
            <h3>
              {requested_docs[props.current_requested_doc] &&
                requested_docs[props.current_requested_doc].name}
            </h3>
          </div>
        </div>
      )}
      {!showReview && showDoc && (
        <div className="participants_header">
          <div className="d-flex justify-content-center pt-3">
            <h3>
              {review_docs[props.current_review_doc] &&
                review_docs[props.current_review_doc].display_name}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (stroe: IStoreState) => {
  const { settings, participant, file } = stroe;
  const { participants, total, savedCount } = participant;
  const {
    index,
    current_review_doc,
    current_requested_doc,
    current_doc,
    total: totalPages,
    maxy,
    pdf_setted,
  } = settings;
  const {
    count,
    sigining_docs,
    requested_docs,
    review_docs,
    current_package_name,
  } = file;
  return {
    current_doc,
    current_requested_doc,
    current_review_doc,
    participants,
    total,
    totalPages,
    index,
    count,
    sigining_docs,
    requested_docs,
    review_docs,
    current_package_name,
    savedCount,
    maxy,
    pdf_setted,
  };
};
export default connect(mapStateToProps, {
  updateHeaderTitle,
  updateTotalParticipant,
  removeSigner,
})(AddParticipant);
