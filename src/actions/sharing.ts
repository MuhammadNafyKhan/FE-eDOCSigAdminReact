import {
  ADD_SHARING,
  ADD_SHARING_LOCAL,
  EDIT_SHARING,
  EDIT_SHARING_LOCAL,
  REMOVE_SHARING,
  REMOVE_SHARING_LOCAL,
  GET_SHARINGS,
  SET_SHARINGS,
  SET_SHARING_LOADER,
  GET_SINGLE_SHARINGS,
  SET_SINGLE_SHARINGS,
  SAVE_SHARINGS,
  SAVE_REVIEW_USER,
  SAVE_REQUEST_USER,
} from "../constants/actionTypes";

export const addSharing = (payload?: any) => {
  return {
    type: ADD_SHARING,
    payload,
  };
};

export const addSharingLocal = (payload?: any) => {
  return {
    type: ADD_SHARING_LOCAL,
    payload,
  };
};

export const editSharing = (payload?: any) => {
  return {
    type: EDIT_SHARING,
    payload,
  };
};

export const editSharingLocal = (payload?: any) => {
  return {
    type: EDIT_SHARING_LOCAL,
    payload,
  };
};

export const removeSharing = (payload?: any) => {
  return {
    type: REMOVE_SHARING,
    payload,
  };
};

export const removeSharingLocal = (payload?: any) => {
  return {
    type: REMOVE_SHARING_LOCAL,
    payload,
  };
};

export const getSharings = (payload?: any) => {
  return {
    type: GET_SHARINGS,
    payload,
  };
};

export const setSharings = (payload?: any) => {
  return {
    type: SET_SHARINGS,
    payload,
  };
};

export const setSharingLoader = (payload?: any) => {
  return {
    type: SET_SHARING_LOADER,
    payload,
  };
};

export const getSingleSharing = (payload?: any) => {
  return {
    type: GET_SINGLE_SHARINGS,
    payload,
  };
};

export const setSingleSharing = (payload?: any) => {
  return {
    type: SET_SINGLE_SHARINGS,
    payload,
  };
};

export const saveSharings = (payload?: any) => {
  return {
    type: SAVE_SHARINGS,
    payload,
  };
};

export const saveReveiwUser = (payload?: any) => {
  return {
    type: SAVE_REVIEW_USER,
    payload,
  };
};

export const saveRequestUser = (payload?: any) => {
  return {
    type: SAVE_REQUEST_USER,
    payload,
  };
};
