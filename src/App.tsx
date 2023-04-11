import { useEffect, lazy } from "react";
import { connect } from "react-redux";
import { IStoreState } from "./reducers";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getMyIP, getCurrentUser } from "./actions/auth";
import { updateAuthCheck } from "./actions/settings";
import { Loader } from "./components/general/Loader";
const Login = lazy(() => import("./pages/Login"));
const MainApp = lazy(() => import("./components/app"));

interface IProps {
  isAuthenticated: boolean;
  auth_checking: boolean;
  getMyIP(): void;
  getCurrentUser(val: boolean): void;
  updateAuthCheck(cehcking: boolean): void;
}

function App(props: IProps) {
  console.log("props: ", props);
  const { auth_checking } = props;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (props.isAuthenticated) {
      props.updateAuthCheck(true);
      props.getCurrentUser(false);
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    props.getMyIP();
    if (!props.isAuthenticated) {
      navigate("/login");
    } else {
      if (location.pathname === "/") {
        navigate("/app");
      }
    }
  }, [props.isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.isAuthenticated) {
      props.getCurrentUser(false);
    }
    // eslint-disable-next-line
  }, [props.isAuthenticated, location.pathname]);

  if (auth_checking) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader size="5rem" color="#54B4D8" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/app/*" element={<MainApp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

const mapStateToProps = (store: IStoreState) => {
  const { auth, settings } = store;
  const { auth_checking } = settings;

  const { isAuthenticated } = auth;
  return { isAuthenticated, auth_checking };
};

export default connect(mapStateToProps, {
  getMyIP,
  getCurrentUser,
  updateAuthCheck,
})(App);
