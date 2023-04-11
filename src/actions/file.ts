import {
  ADD_FILE,
  EDIT_FILE,
  REMOVE_FILE,
  REMOVE_SIGNER,
  SET_FILES,
  SAVE_PDF_IMAGES,
} from "../constants/actionTypes";

export const addFile = (payload?: any) => {
  return {
    type: ADD_FILE,
    payload,
  };
};

export const editFile = (payload?: any) => {
  return {
    type: EDIT_FILE,
    payload,
  };
};

export const removeFile = (payload?: any) => {
  return {
    type: REMOVE_FILE,
    payload,
  };
};

export const removeSigner = (payload?: any) => {
  return {
    type: REMOVE_SIGNER,
    payload,
  };
};

export const setFiles = (payload?: any) => {
  return {
    type: SET_FILES,
    payload,
  };
};

export const setPDFImages = (payload?: any) => {
  return {
    type: SAVE_PDF_IMAGES,
    payload,
  };
};
