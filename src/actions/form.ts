import {
  ADD_FORM,
  ADD_FORM_LOCAL,
  EDIT_FORM,
  EDIT_FORM_LOCAL,
  REMOVE_FORM,
  REMOVE_FORM_LOCAL,
  GET_FORMS,
  SET_FORMS,
  SET_FORM_LOADER,
  GET_SINGLE_FORMS,
  SET_SINGLE_FORMS,
  SAVE_INDEXES,
} from "../constants/actionTypes";

export const addForm = (payload?: any) => {
  return {
    type: ADD_FORM,
    payload,
  };
};

export const addFormLocal = (payload?: any) => {
  return {
    type: ADD_FORM_LOCAL,
    payload,
  };
};

export const editForm = (payload?: any) => {
  return {
    type: EDIT_FORM,
    payload,
  };
};

export const editFormLocal = (payload?: any) => {
  return {
    type: EDIT_FORM_LOCAL,
    payload,
  };
};

export const removeForm = (payload?: any) => {
  return {
    type: REMOVE_FORM,
    payload,
  };
};

export const removeFormLocal = (payload?: any) => {
  return {
    type: REMOVE_FORM_LOCAL,
    payload,
  };
};

export const getForms = (payload?: any) => {
  return {
    type: GET_FORMS,
    payload,
  };
};

export const setForms = (payload?: any) => {
  return {
    type: SET_FORMS,
    payload,
  };
};

export const setFormLoader = (payload?: any) => {
  return {
    type: SET_FORM_LOADER,
    payload,
  };
};

export const getSingleForm = (payload?: any) => {
  return {
    type: GET_SINGLE_FORMS,
    payload,
  };
};

export const setSingleForm = (payload?: any) => {
  return {
    type: SET_SINGLE_FORMS,
    payload,
  };
};

export const saveIndexes = (payload?: any) => {
  return {
    type: SAVE_INDEXES,
    payload,
  };
};
