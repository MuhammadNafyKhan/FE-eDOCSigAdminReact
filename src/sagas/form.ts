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
  ADD_FORM,
  EDIT_FORM,
  REMOVE_FORM,
  GET_FORMS,
  GET_SINGLE_FORMS,
} from "../constants/actionTypes";
import {
  addFormLocal,
  editFormLocal,
  setForms,
  setSingleForm,
  removeFormLocal,
  setFormLoader,
} from "../actions/form";
import { ApiService } from "../services/apiService";
import { ip, token, user } from "../constants/selectors";

interface IAction {
  type: string;
  payload?: any;
}

export interface ResponseGenerator {
  [key: string]: any;
}

function* getFormsSaga({ payload }: IAction) {
  try {
    yield put(setFormLoader({ loader: true }));
    const session: string = yield select(token);
    const host: string = yield select(ip);
    const userData: ResponseGenerator = yield select(user);
    const controlid = userData.controlid;
    const path = `/FORMS/`;
    const body = {
      session,
      host,
      controlid,
      action: "GETFORMSLIST",
    };
    const res: ResponseGenerator = yield call(ApiService.post, path, body);
    if (res.result) {
      yield put(setForms(res));
    } else {
      yield put(setFormLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setFormLoader({ loader: false }));
    console.log("error on load user");
  }
}

function* getSingleFormSaga({ payload }: IAction) {
  try {
    yield put(setFormLoader({ loader: true }));
    const session: string = yield select(token);
    const host: string = yield select(ip);
    const userData: ResponseGenerator = yield select(user);
    const controlid = userData.controlid;
    const path = `/FORMS/`;
    const body = {
      action: "GETFORMDATA",
      formname: payload,
      session,
      host,
      controlid,
    };
    const res: ResponseGenerator = yield call(ApiService.post, path, body);
    if (res.result) {
      yield put(setSingleForm(res));
    } else {
      yield put(setFormLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setFormLoader({ loader: false }));
    console.log("error on load user");
  }
}

function* editFormSaga({ payload }: IAction) {
  try {
    yield put(setFormLoader({ loader: true }));
    const path = ``;
    const body = { ...payload };
    const index = body.index;
    delete body.index;
    const res: ResponseGenerator = yield call(ApiService.patch, path, body);
    if (res.result) {
      yield put(editFormLocal({ index, value: res }));
    } else {
      yield put(setFormLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setFormLoader({ loader: false }));
    console.log("error on load user");
  }
}

function* removeFormSaga({ payload }: IAction) {
  try {
    yield put(setFormLoader({ loader: true }));
    const index = payload.index;
    const userData: ResponseGenerator = yield select(user);
    const path = `user/${userData}`;
    const res: ResponseGenerator = yield call(ApiService.delete, path);
    if (res.result) {
      yield put(removeFormLocal({ index }));
    } else {
      yield put(setFormLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setFormLoader({ loader: false }));
    console.log("error on load user");
  }
}

function* addFormSaga({ payload }: IAction) {
  try {
    yield put(setFormLoader({ loader: true }));
    const path = ``;
    const res: ResponseGenerator = yield call(ApiService.post, path, payload);
    if (res.result) {
      yield put(addFormLocal(res));
    } else {
      yield put(setFormLoader({ loader: false }));
    }
  } catch (error: any) {
    yield put(setFormLoader({ loader: false }));
    console.log("error on load user");
  }
}

function* watchOnGetForms() {
  yield takeEvery(GET_FORMS, getFormsSaga);
}

function* watchOnGetSingleForm() {
  yield takeEvery(GET_SINGLE_FORMS, getSingleFormSaga);
}

function* watchOnRemoveForm() {
  yield takeEvery(REMOVE_FORM, removeFormSaga);
}

function* watchOnEditForm() {
  yield takeEvery(EDIT_FORM, editFormSaga);
}

function* watchOnAddForm() {
  yield takeLatest(ADD_FORM, addFormSaga);
}

export default function* rootSaga() {
  yield all([
    fork(watchOnGetForms),
    fork(watchOnGetSingleForm),
    fork(watchOnRemoveForm),
    fork(watchOnEditForm),
    fork(watchOnAddForm),
  ]);
}
