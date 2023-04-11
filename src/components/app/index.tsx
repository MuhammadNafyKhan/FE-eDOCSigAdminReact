import Header from "../header";
import SideBar from "../sidebar";
import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { IStoreState } from "../../reducers";
import NoActivity from "../general/NoActivity";
import {
  updateActivityModal,
  getCurrentUser,
  onLogout,
} from "../../actions/auth";
import { ISigningDoc } from "../../interface";
import { Loader } from "../general/Loader";
const AddDocs = lazy(() => import("../../pages/AddDocs"));
const AddParticipant = lazy(() => import("../../pages/AddParticipants"));
// const AddIndexes = lazy(() => import("../../pages/AddIndexes"));
const AddElements = lazy(() => import("../../pages/AddElements"));
// const AddSharing = lazy(() => import("../../pages/AddSharing"));
const PackageDetails = lazy(() => import("../../pages/PackageDetails"));
const ManagePackage = lazy(() => import("../../pages/ManagePackage"));
const Spiner = () => (
  <div className="d-flex flex-column align-items-center justify-content-center h-100">
    <Loader size="5rem" color="#54B4D8" />
  </div>
);
interface IProps {
  count: number;
  savedCount: number;
  showActivityModal: boolean;
  sigining_docs: ISigningDoc[];
  updateActivityModal(payload: any): void;
  getCurrentUser(payload?: any): void;
  onLogout(): void;
}
const App: React.FC<IProps> = ({
  savedCount,
  count,
  showActivityModal,
  sigining_docs,
  updateActivityModal,
  getCurrentUser,
  onLogout,
}) => {
  const refreshSession = () => {
    getCurrentUser();
    updateActivityModal(false);
  };

  return (
    <div>
      <Header />
      <div style={{ display: "flex", width: "100%" }}>
        <SideBar count={savedCount} sigining_docs={sigining_docs.length} />
        <div style={{ width: "100%" }}>
          <Suspense fallback={<Spiner />}>
            <Routes>
              <Route path="/" element={<AddDocs />} />
              <Route path="/addparticipants" element={<AddParticipant />} />
              {/* <Route path="/addindexes" element={<AddIndexes />} /> */}
              <Route path="/addelements" element={<AddElements />} />
              {/* <Route path="/addsharing" element={<AddSharing />} /> */}
              <Route path="/packagesdetail" element={<PackageDetails />} />
              <Route path="/managepackage" element={<ManagePackage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
      {showActivityModal && (
        <NoActivity onRefresh={refreshSession} onLogoff={onLogout} />
      )}
    </div>
  );
};

const mapStateToProps = ({ participant, auth, file }: IStoreState) => {
  const { count, savedCount } = participant;
  const { showActivityModal } = auth;
  const { sigining_docs } = file;
  return {
    count,
    showActivityModal,
    sigining_docs,
    savedCount,
  };
};
export default connect(mapStateToProps, {
  updateActivityModal,
  getCurrentUser,
  onLogout,
})(App);
