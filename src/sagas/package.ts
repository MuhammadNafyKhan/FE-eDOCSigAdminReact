import {
  all,
  call,
  select,
  fork,
  put,
  // takeLatest,
  takeLeading,
} from "redux-saga/effects";

import {
  ADD_PACKAGE,
  EDIT_PACKAGE,
  REMOVE_PACKAGE,
  GET_PACKAGES,
  GET_SINGLE_PACKAGES,
} from "../constants/actionTypes";
import {
  editPackageLocal,
  setPackages,
  setSinglePackage,
  removePackageLocal,
  setPackageLoader,
} from "../actions/packages";
import { ApiService } from "../services/apiService";
import { ip, token, user } from "../constants/selectors";
import { createNotification, IActionType } from "../helpers/notificationHelper";
import { resetState } from "../actions/settings";

interface IAction {
  type: string;
  payload?: any;
}

export interface ResponseGenerator {
  [key: string]: any;
}

function* getPackagesSaga({ payload }: IAction) {
  try {
    yield put(setPackageLoader({ loader: true }));
    const session: string = yield select(token);
    const host: string = yield select(ip);
    const userData: ResponseGenerator = yield select(user);
    const controlid = userData.controlid;
    const body = {
      session,
      controlid,
      action: "SEARCH",
      createdby: userData.username,
      orderby: "Created_On DESC",
      fromdate: "",
      host,
    };
    const path = `/PACKAGES/`;
    const res: ResponseGenerator = yield call(ApiService.post, path, body);
    if (res.result) {
      yield put(setPackages(res));
    } else {
      yield put(setPackageLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setPackageLoader({ loader: false }));
    console.log("error on load user");
  }
}

function* getSinglePackageSaga({ payload }: IAction) {
  try {
    yield put(setPackageLoader({ loader: true }));
    const path = ``;
    const res: ResponseGenerator = yield call(ApiService.get, path);
    if (res.result) {
      yield put(setSinglePackage(res));
    } else {
      yield put(setPackageLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setPackageLoader({ loader: false }));
    console.log("error on load user");
  }
}

function* editPackageSaga({ payload }: IAction) {
  try {
    yield put(setPackageLoader({ loader: true }));

    const path = ``;
    const body = { ...payload };
    const index = body.index;
    delete body.index;
    const res: ResponseGenerator = yield call(ApiService.patch, path, body);
    if (res.result) {
      yield put(editPackageLocal({ index, value: res }));
    } else {
      yield put(setPackageLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setPackageLoader({ loader: false }));
    console.log("error on load user");
  }
}

function* removePackageSaga({ payload }: IAction) {
  try {
    yield put(setPackageLoader({ loader: true }));
    const index = payload.index;
    const path = ``;
    const res: ResponseGenerator = yield call(ApiService.delete, path);
    if (res.result) {
      yield put(removePackageLocal({ index }));
    } else {
      yield put(setPackageLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setPackageLoader({ loader: false }));
    console.log("error on load user");
  }
}

function* addPackageSaga({ payload }: IAction) {
  try {
    yield put(setPackageLoader({ loader: true }));
    const pkgPath = `/PACKAGES/`;
    const { package: pkg = {}, send = false, sendObj } = payload;
    let pkgid = "";
    if (!pkg.id) {
      //create pkg
      delete pkg.id;
      const packageResponse: ResponseGenerator = yield call(
        ApiService.post,
        pkgPath,
        pkg
      );
      if (!packageResponse.result) {
        throw new Error("something went wrong");
      } else {
        pkgid = packageResponse.pkgid;
      }
    }
    const path = `/DFC/`;
    const {
      signingDocs = [],
      reviewDocs = [],
      requestDocs = [],
      presentationorder,
    } = payload;
    const total = signingDocs.length + reviewDocs.length + requestDocs.length;
    let sent = 0;
    for (const element of signingDocs) {
      element.pkgid = pkgid;
      element.presentationorder = presentationorder;
      const res: ResponseGenerator = yield call(ApiService.post, path, element);
      if (res.result) {
        sent++;
      }
    }
    for (const element of reviewDocs) {
      element.pkgid = pkgid;
      element.presentationorder = presentationorder;
      const res: ResponseGenerator = yield call(ApiService.post, path, element);
      if (res.result) {
        sent++;
      }
    }
    for (const element of requestDocs) {
      element.pkgid = pkgid;
      const res: ResponseGenerator = yield call(ApiService.post, path, element);
      if (res.result) {
        sent++;
      }
    }
    createNotification(
      IActionType.success,
      `${sent} out of ${total} DFC(s) created`
    );
    if (send) {
      sendObj.pkgid = pkgid;
      const res: ResponseGenerator = yield call(
        ApiService.post,
        pkgPath,
        sendObj
      );
      if (!res.result) {
        createNotification(IActionType.error, "Failed to Send Package");
      } else {
        createNotification(IActionType.success, "Package Sent.");
      }
    }
    yield put(setPackageLoader({ loader: false, message: "pkg created" }));
    yield put(resetState());
  } catch (error: any) {
    yield put(setPackageLoader({ loader: false }));
  }
}

function* watchOnGetPackages() {
  yield takeLeading(GET_PACKAGES, getPackagesSaga);
}

function* watchOnGetSinglePackage() {
  yield takeLeading(GET_SINGLE_PACKAGES, getSinglePackageSaga);
}

function* watchOnRemovePackage() {
  yield takeLeading(REMOVE_PACKAGE, removePackageSaga);
}

function* watchOnEditPackage() {
  yield takeLeading(EDIT_PACKAGE, editPackageSaga);
}

function* watchOnAddPackage() {
  yield takeLeading(ADD_PACKAGE, addPackageSaga);
}

export default function* rootSaga() {
  yield all([
    fork(watchOnGetPackages),
    fork(watchOnGetSinglePackage),
    fork(watchOnRemovePackage),
    fork(watchOnEditPackage),
    fork(watchOnAddPackage),
  ]);
}
