import {
  all,
  call,
  select,
  fork,
  put,
  takeLatest,
  // takeLeading
  takeLeading,
} from "redux-saga/effects";
import {
  USER_LOGIN_REQUEST,
  USER_LOGOUT_REQUEST,
  USER_FORGOT_PASSWORD_REQUEST,
  GET_MY_IP,
  GET_CURRENT_USER,
} from "../constants/actionTypes";
import {
  onLogin,
  onLogout,
  setAuthLoader,
  onForgotPassword,
  setMyIP,
  setCurrentUser,
} from "../actions/auth";
import { updateAuthCheck } from "../actions/settings";
import { createNotification, IActionType } from "../helpers/notificationHelper";
import { ApiService } from "../services/apiService";
import { ip, token, user } from "../constants/selectors";

import axios from "axios";
import { apiPaths } from "../constants/apiPaths";

interface IAction {
  type: string;
  payload?: any;
}

export interface ResponseGenerator {
  [key: string]: any;
}
function* userLoaginSaga({ payload }: IAction) {
  try {
    yield put(setAuthLoader({ loader: true }));
    // const host: string = yield select(ip);

    const url = apiPaths.loginAdmin;
    const body = {
      user: payload.username,
      password: payload.password,
    };
    const loginRes: ResponseGenerator = yield call(ApiService.post, url, body);
    if (!loginRes.result) {
      yield put(
        setAuthLoader({
          loader: false,
          message: "Login failed",
        })
      );
      createNotification(IActionType.error, loginRes.systemerror);
    } else {
      yield put(onLogin({ user: loginRes, token: loginRes.session }));
    }
  } catch (error: any) {
    createNotification(IActionType.error, error.message);
    yield put(setAuthLoader({ loader: false, message: error.message }));
  }
}

function* userLogoutSaga({ payload }: IAction) {
  try {
    yield put(onLogout());
  } catch (e) {
    yield put(setAuthLoader({ loader: false }));
  }
}

function* userForgotPasswordSaga({ payload }: IAction) {
  try {
    yield put(setAuthLoader({ loader: true }));
    const path = `/USERS/`;
    const host: string = yield select(ip);
    const body = {
      username: payload.username,
      controlid: payload.username.split("@")[1].toUpperCase(),
      action: "FORGOT_PASSWORD",
      host,
    };
    const res: ResponseGenerator = yield call(ApiService.post, path, body);
    if (!res.result) {
      yield put(setAuthLoader({ loader: false, message: res.systemerror }));
      createNotification(IActionType.error, res.systemerror);
    } else {
      yield put(onForgotPassword());
      createNotification(
        IActionType.success,
        "An email to reset your password has been sent."
      );
    }
  } catch (error: any) {
    createNotification(IActionType.error, error.message);
    yield put(setAuthLoader({ loader: false, message: error.message }));
  }
}

function* getMyIPSaga() {
  try {
    const res: ResponseGenerator = yield call(getIPRequest);
    yield put(setMyIP({ ip: res.data.query }));
  } catch (error: any) {
    console.log("ip not loaded");
  }
}

function* getCurrentUserSaga({ payload }: any) {
  try {
    const session: string = yield select(token);
    const host: string = yield select(ip);
    const userData: ResponseGenerator = yield select(user);
    const controlid = userData.controlid;
    const path = `/SESSIONS/${session}?controlid=${controlid}&host=${host}`;
    const res: ResponseGenerator = yield call(ApiService.get, path);
    if (res.result) {
      yield put(setCurrentUser(res));
    }
  } catch (error: any) {
    console.log("error on load user");
  } finally {
    yield put(updateAuthCheck(false));
  }
}

const getIPRequest = async () => {
  const url = "http://ip-api.com/json";
  const res = await axios.get(url);
  return res;
};

function* watchOnUserLogin() {
  yield takeLeading(USER_LOGIN_REQUEST, userLoaginSaga);
}

function* watchOnUserLogout() {
  yield takeLatest(USER_LOGOUT_REQUEST, userLogoutSaga);
}

function* watchOnUserForgotPassword() {
  yield takeLeading(USER_FORGOT_PASSWORD_REQUEST, userForgotPasswordSaga);
}

function* watchOnGetIP() {
  yield takeLeading(GET_MY_IP, getMyIPSaga);
}

function* watchOnGetCurrentUser() {
  yield takeLeading(GET_CURRENT_USER, getCurrentUserSaga);
}

export default function* rootSaga() {
  yield all([
    fork(watchOnUserLogin),
    fork(watchOnUserLogout),
    fork(watchOnUserForgotPassword),
    fork(watchOnGetIP),
    fork(watchOnGetCurrentUser),
  ]);
}
