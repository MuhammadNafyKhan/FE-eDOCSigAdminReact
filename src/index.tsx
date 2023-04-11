import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./styles/formsandinputs.css";
import "./styles/eDOCSignature.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "./components/general/Loader";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Spiner = () => {
  return (
    <div
      className="d-flex flex-column w-100 justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Loader color="#54B4D8" size="5rem" />
    </div>
  );
};
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Suspense fallback={<Spiner />}>
          <App />
        </Suspense>
        <ToastContainer hideProgressBar theme="colored" autoClose={false} />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
