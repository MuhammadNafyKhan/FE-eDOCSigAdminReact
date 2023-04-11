import {
  ADD_PACKAGE_LOCAL,
  EDIT_PACKAGE_LOCAL,
  REMOVE_PACKAGE_LOCAL,
  RESET_STATE,
  SET_PACKAGES,
  SET_PACKAGE_LOADER,
  SET_SINGLE_PACKAGES,
  USER_LOGOUT,
} from "../constants/actionTypes";
import { IApiPackage } from "../interface";

export interface IStoreState {
  loader: boolean;
  error: boolean;
  message: string;
  packages: IApiPackage[];
  selectedPackage: IApiPackage | null;
  total: number;
}
const INITIAL_STATE: IStoreState = {
  loader: false,
  error: false,
  message: "",
  selectedPackage: null,
  packages: [],
  total: 0,
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
    case USER_LOGOUT: {
      return { ...INITIAL_STATE };
    }

    case RESET_STATE: {
      return { ...state, selectedPackage: null };
    }
    case SET_PACKAGES: {
      const { packages, total } = payload;
      return {
        ...state,
        packages: [...packages],
        total,
        loader: false,
      };
    }
    case ADD_PACKAGE_LOCAL: {
      const { value } = payload;
      return {
        ...state,
        packages: [...state.packages, value],
      };
    }

    case EDIT_PACKAGE_LOCAL: {
      const { index, value } = payload;
      const clone = [...state.packages];
      clone[index] = value;
      return {
        ...state,
        packages: clone,
      };
    }

    case REMOVE_PACKAGE_LOCAL: {
      const { index } = payload;
      const newPackages = [...state.packages];
      newPackages.splice(index, 1);
      return {
        ...state,
        packages: newPackages,
      };
    }

    case SET_PACKAGE_LOADER: {
      const { loader = false, error = false, message = "" } = payload;
      return {
        ...state,
        loader,
        error,
        message,
      };
    }

    case SET_SINGLE_PACKAGES: {
      return {
        ...state,
        selectedPackage: payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
