import {
  ADD_PACKAGE,
  ADD_PACKAGE_LOCAL,
  EDIT_PACKAGE,
  EDIT_PACKAGE_LOCAL,
  REMOVE_PACKAGE,
  REMOVE_PACKAGE_LOCAL,
  GET_PACKAGES,
  SET_PACKAGES,
  SET_PACKAGE_LOADER,
  GET_SINGLE_PACKAGES,
  SET_SINGLE_PACKAGES,
} from "../constants/actionTypes";

export const addPackage = (payload?: any) => {
  return {
    type: ADD_PACKAGE,
    payload,
  };
};

export const addPackageLocal = (payload?: any) => {
  return {
    type: ADD_PACKAGE_LOCAL,
    payload,
  };
};

export const editPackage = (payload?: any) => {
  return {
    type: EDIT_PACKAGE,
    payload,
  };
};

export const editPackageLocal = (payload?: any) => {
  return {
    type: EDIT_PACKAGE_LOCAL,
    payload,
  };
};

export const removePackage = (payload?: any) => {
  return {
    type: REMOVE_PACKAGE,
    payload,
  };
};

export const removePackageLocal = (payload?: any) => {
  return {
    type: REMOVE_PACKAGE_LOCAL,
    payload,
  };
};

export const getPackages = (payload?: any) => {
  return {
    type: GET_PACKAGES,
    payload,
  };
};

export const setPackages = (payload?: any) => {
  return {
    type: SET_PACKAGES,
    payload,
  };
};

export const setPackageLoader = (payload?: any) => {
  return {
    type: SET_PACKAGE_LOADER,
    payload,
  };
};

export const getSinglePackage = (payload?: any) => {
  return {
    type: GET_SINGLE_PACKAGES,
    payload,
  };
};

export const setSinglePackage = (payload?: any) => {
  return {
    type: SET_SINGLE_PACKAGES,
    payload,
  };
};
