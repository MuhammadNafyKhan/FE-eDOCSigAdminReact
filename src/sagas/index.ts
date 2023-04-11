import { all } from "redux-saga/effects";
import authSagas from "./auth";
import packageSagas from "./package";
import templateSagas from "./template";
import formSagas from "./form";
import sharingSagas from "./sharing";
export default function* rootSaga(getState?: any) {
  yield all([
    authSagas(),
    packageSagas(),
    templateSagas(),
    formSagas(),
    sharingSagas(),
  ]);
}
