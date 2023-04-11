import {
  all,
  call,
  select,
  fork,
  put,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";

import {
  ADD_SHARING,
  EDIT_SHARING,
  REMOVE_SHARING,
  GET_SHARINGS,
  GET_SINGLE_SHARINGS,
} from "../constants/actionTypes";
import {
  addSharingLocal,
  editSharingLocal,
  setSharings,
  setSingleSharing,
  removeSharingLocal,
  setSharingLoader,
} from "../actions/sharing";
import { ApiService } from "../services/apiService";
import { ip, token, user } from "../constants/selectors";

interface IAction {
  type: string;
  payload?: any;
}

export interface ResponseGenerator {
  [key: string]: any;
}

function* getSharingsSaga({ payload }: IAction) {
  try {
    yield put(setSharingLoader({ loader: true }));
    const session: string = yield select(token);
    const host: string = yield select(ip);
    const userData: ResponseGenerator = yield select(user);
    const controlid = userData.controlid;
    const body = {
      session,
      host,
      controlid,
      action: "GETUSERS",
    };
    const userPath = `/USERS/`;
    const res: ResponseGenerator = yield call(ApiService.post, userPath, body);
    if (res.result) {
      const groupsPath = "/GROUPS/";
      body.action = "GETGROUPLIST";
      const groupRes: ResponseGenerator = yield call(
        ApiService.post,
        groupsPath,
        body
      );
      if (groupRes.result) {
        yield put(setSharings({ users: res.users, groups: groupRes.groups }));
      } else {
        yield put(setSharingLoader({ loader: false }));
      }
    } else {
      yield put(setSharingLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setSharingLoader({ loader: false }));
  }
}

function* getSingleSharingSaga({ payload }: IAction) {
  try {
    yield put(setSharingLoader({ loader: true }));
    const path = ``;
    const res: ResponseGenerator = yield call(ApiService.get, path);
    if (res.result) {
      yield put(setSingleSharing(res));
    } else {
      yield put(setSharingLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setSharingLoader({ loader: false }));
    console.log("error on load user");
  }
}

function* editSharingSaga({ payload }: IAction) {
  try {
    yield put(setSharingLoader({ loader: true }));
    const path = ``;
    const body = { ...payload };
    const index = body.index;
    delete body.index;
    const res: ResponseGenerator = yield call(ApiService.patch, path, body);
    if (res.result) {
      yield put(editSharingLocal({ index, value: res }));
    } else {
      yield put(setSharingLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setSharingLoader({ loader: false }));
    console.log("error on load user");
  }
}

function* removeSharingSaga({ payload }: IAction) {
  try {
    yield put(setSharingLoader({ loader: true }));
    const index = payload.index;
    const path = ``;
    const res: ResponseGenerator = yield call(ApiService.delete, path);
    if (res.result) {
      yield put(removeSharingLocal({ index }));
    } else {
      yield put(setSharingLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setSharingLoader({ loader: false }));
    console.log("error on load user");
  }
}

function* addSharingSaga({ payload }: IAction) {
  try {
    yield put(setSharingLoader({ loader: true }));
    //* const session: string = yield select(token);
    // const host: string = yield select(ip);
    // const userData: ResponseGenerator = yield select(user);
    // const controlid = userData.controlid;
    const path = ``;
    const res: ResponseGenerator = yield call(ApiService.post, path, payload);
    if (res.result) {
      yield put(addSharingLocal(res));
    } else {
      yield put(setSharingLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setSharingLoader({ loader: false }));
    console.log("error on load user");
  }
}

function* watchOnGetSharings() {
  yield takeEvery(GET_SHARINGS, getSharingsSaga);
}

function* watchOnGetSingleSharing() {
  yield takeEvery(GET_SINGLE_SHARINGS, getSingleSharingSaga);
}

function* watchOnRemoveSharing() {
  yield takeEvery(REMOVE_SHARING, removeSharingSaga);
}

function* watchOnEditSharing() {
  yield takeEvery(EDIT_SHARING, editSharingSaga);
}

function* watchOnAddSharing() {
  yield takeLatest(ADD_SHARING, addSharingSaga);
}

export default function* rootSaga() {
  yield all([
    fork(watchOnGetSharings),
    fork(watchOnGetSingleSharing),
    fork(watchOnRemoveSharing),
    fork(watchOnEditSharing),
    fork(watchOnAddSharing),
  ]);
}
