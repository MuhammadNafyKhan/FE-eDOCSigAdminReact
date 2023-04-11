import {
  SET_AUTH_LOADER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_FORGOT_PASSWORD,
  SET_MY_IP,
  SET_CURRENT_USER,
  UPDATE_ACTIVITY_TIMEOUT,
  UPDATE_LOGOUT_TIMEOUT,
  UPDATE_ACTIVTITY_MODAL,
} from "../constants/actionTypes";
import { IApiUser } from "../interface";

export interface IStoreState {
  isAuthenticated: boolean;
  user?: IApiUser;
  token: string | null;
  loader: boolean;
  error: boolean;
  message: string;
  ip: string;
  logoutTimeOutId: number | null;
  activityTimeOutId: number | null;
  showActivityModal: boolean;
}
const INITIAL_STATE: IStoreState = {
  isAuthenticated: false,
  token: null,
  loader: false,
  error: false,
  message: "",
  ip: "",
  logoutTimeOutId: null,
  activityTimeOutId: null,
  showActivityModal: false,
};

interface IActionType {
  type: string;
  payload: any;
}
const reducer = (
  state = INITIAL_STATE,
  { type, payload }: IActionType = { type: "", payload: {} }
): IStoreState => {
  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: payload.token,
        user: payload.user,
        loader: false,
      };
    case USER_LOGOUT:
      if (state.activityTimeOutId) {
        clearTimeout(state.activityTimeOutId);
      }
      if (state.logoutTimeOutId) {
        clearTimeout(state.logoutTimeOutId);
      }
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: undefined,
        logoutTimeOutId: null,
        activityTimeOutId: null,
        showActivityModal: false,
      };

    case SET_AUTH_LOADER: {
      const { loader = false, error = false, message = "" } = payload;
      return {
        ...state,
        loader,
        error,
        message,
      };
    }

    case USER_FORGOT_PASSWORD: {
      return {
        ...state,
        loader: false,
      };
    }

    case SET_MY_IP: {
      return {
        ...state,
        ip: payload.ip,
      };
    }

    case SET_CURRENT_USER: {
      return {
        ...state,
        user: payload,
      };
    }

    case UPDATE_LOGOUT_TIMEOUT: {
      if (state.logoutTimeOutId) {
        clearTimeout(state.logoutTimeOutId);
      }
      return {
        ...state,
        logoutTimeOutId: payload,
      };
    }

    case UPDATE_ACTIVITY_TIMEOUT: {
      if (state.activityTimeOutId) {
        clearTimeout(state.activityTimeOutId);
      }
      return {
        ...state,
        activityTimeOutId: payload,
      };
    }

    case UPDATE_ACTIVTITY_MODAL: {
      return {
        ...state,
        showActivityModal: payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
