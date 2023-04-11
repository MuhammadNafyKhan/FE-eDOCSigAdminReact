import {
  ADD_TEMPLATE,
  ADD_TEMPLATE_LOCAL,
  EDIT_TEMPLATE,
  EDIT_TEMPLATE_LOCAL,
  REMOVE_TEMPLATE,
  REMOVE_TEMPLATE_LOCAL,
  GET_TEMPLATES,
  SET_TEMPLATES,
  SET_TEMPLATE_LOADER,
  GET_SINGLE_TEMPLATES,
  SET_SINGLE_TEMPLATES,
  GET_CATAGORIES,
  SET_CATAGORIES,
  GET_SIGNING_TEMPLATES,
  SET_SIGNING_TEMPLATES,
} from "../constants/actionTypes";

export const addTemplate = (payload?: any) => {
  return {
    type: ADD_TEMPLATE,
    payload,
  };
};

export const addTemplateLocal = (payload?: any) => {
  return {
    type: ADD_TEMPLATE_LOCAL,
    payload,
  };
};

export const editTemplate = (payload?: any) => {
  return {
    type: EDIT_TEMPLATE,
    payload,
  };
};

export const editTemplateLocal = (payload?: any) => {
  return {
    type: EDIT_TEMPLATE_LOCAL,
    payload,
  };
};

export const removeTemplate = (payload?: any) => {
  return {
    type: REMOVE_TEMPLATE,
    payload,
  };
};

export const removeTemplateLocal = (payload?: any) => {
  return {
    type: REMOVE_TEMPLATE_LOCAL,
    payload,
  };
};

export const getTemplates = (payload?: any) => {
  return {
    type: GET_TEMPLATES,
    payload,
  };
};

export const setTemplates = (payload?: any) => {
  return {
    type: SET_TEMPLATES,
    payload,
  };
};

export const setTemplateLoader = (payload?: any) => {
  return {
    type: SET_TEMPLATE_LOADER,
    payload,
  };
};

export const getSingleTemplate = (payload?: any) => {
  return {
    type: GET_SINGLE_TEMPLATES,
    payload,
  };
};

export const setSingleTemplate = (payload?: any) => {
  return {
    type: SET_SINGLE_TEMPLATES,
    payload,
  };
};

export const getCatagories = (payload?: any) => {
  return {
    type: GET_CATAGORIES,
    payload,
  };
};

export const setCatagories = (payload?: any) => {
  return {
    type: SET_CATAGORIES,
    payload,
  };
};

export const getSigingTemplate = (payload?: any) => {
  return {
    type: GET_SIGNING_TEMPLATES,
    payload,
  };
};

export const setSigningTemplate = (payload?: any) => {
  return {
    type: SET_SIGNING_TEMPLATES,
    payload,
  };
};
