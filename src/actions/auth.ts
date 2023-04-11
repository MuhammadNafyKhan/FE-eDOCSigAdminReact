import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGOUT_REQUEST,
  SET_AUTH_LOADER,
  USER_FORGOT_PASSWORD,
  USER_FORGOT_PASSWORD_REQUEST,
  GET_MY_IP,
  SET_MY_IP,
  SET_CURRENT_USER,
  GET_CURRENT_USER,
  UPDATE_LOGOUT_TIMEOUT,
  UPDATE_ACTIVITY_TIMEOUT,
  UPDATE_ACTIVTITY_MODAL,
} from "../constants/actionTypes";

export const onLogin = (payload: any) => {
  return {
    type: USER_LOGIN,
    payload,
  };
};

export const onLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const logoutRequest = () => {
  return {
    type: USER_LOGOUT_REQUEST,
  };
};

export const loginRequest = (payload: any) => {
  return {
    type: USER_LOGIN_REQUEST,
    payload,
  };
};

export const setAuthLoader = (payload: any) => {
  return {
    type: SET_AUTH_LOADER,
    payload,
  };
};

export const userForgotPasswordRequest = (payload: any) => {
  return {
    type: USER_FORGOT_PASSWORD_REQUEST,
    payload,
  };
};

export const onForgotPassword = (payload?: any) => {
  return {
    type: USER_FORGOT_PASSWORD,
    payload,
  };
};

export const getMyIP = (payload?: any) => {
  return {
    type: GET_MY_IP,
    payload,
  };
};

export const setMyIP = (payload?: any) => {
  return {
    type: SET_MY_IP,
    payload,
  };
};

export const getCurrentUser = (payload?: any) => {
  return {
    type: GET_CURRENT_USER,
    payload,
  };
};
export const setCurrentUser = (payload?: any) => {
  return {
    type: SET_CURRENT_USER,
    payload,
  };
};

export const updateActivityTimeout = (payload?: any) => {
  return {
    type: UPDATE_ACTIVITY_TIMEOUT,
    payload,
  };
};

export const updateLogoutTimeout = (payload?: any) => {
  return {
    type: UPDATE_LOGOUT_TIMEOUT,
    payload,
  };
};

export const updateActivityModal = (payload?: any) => {
  return {
    type: UPDATE_ACTIVTITY_MODAL,
    payload,
  };
};
