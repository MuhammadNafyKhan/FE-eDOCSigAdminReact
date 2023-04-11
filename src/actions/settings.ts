import {
  UPDATE_HEADER_TITLE,
  UPDATE_CURRENT_PAGE,
  UPDATE_INDEX,
  UPDATE_CURRENT_DOC,
  UPDATE_REVIEW_DOC,
  UPDATE_REQUESTED_DOC,
  UPDATE_AUTH_CHECK,
  UPDATE_PDF_SETTINGS,
  RESET_INDEX,
  DELETE_PDF_SETTINGS,
  RESET_STATE,
} from "../constants/actionTypes";

export const updateHeaderTitle = (payload?: any) => {
  return {
    type: UPDATE_HEADER_TITLE,
    payload,
  };
};

export const updateCurrentPDFPage = (payload?: any) => {
  return {
    type: UPDATE_CURRENT_PAGE,
    payload,
  };
};

export const updateCurrentDoc = () => {
  return {
    type: UPDATE_CURRENT_DOC,
  };
};

export const updateIndex = () => {
  return {
    type: UPDATE_INDEX,
  };
};
export const updateReviewDoc = () => {
  return {
    type: UPDATE_REVIEW_DOC,
  };
};

export const updateRequestedDoc = () => {
  return {
    type: UPDATE_REQUESTED_DOC,
  };
};

export const updateAuthCheck = (payload?: any) => {
  return {
    type: UPDATE_AUTH_CHECK,
    payload,
  };
};

export const updatePDFSettings = (payload?: any) => {
  return {
    type: UPDATE_PDF_SETTINGS,
    payload,
  };
};

export const deletePDFSettings = (payload?: any) => {
  return {
    type: DELETE_PDF_SETTINGS,
    payload,
  };
};

export const resetIndex = () => {
  return {
    type: RESET_INDEX,
  };
};

export const resetState = (payload?: any) => {
  return {
    type: RESET_STATE,
    payload,
  };
};
