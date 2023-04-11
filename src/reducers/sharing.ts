import {
  ADD_SHARING_LOCAL,
  EDIT_SHARING_LOCAL,
  REMOVE_SHARING_LOCAL,
  SAVE_SHARINGS,
  SET_SHARINGS,
  SET_SHARING_LOADER,
  SET_SINGLE_SHARINGS,
  USER_LOGOUT,
  SAVE_REQUEST_USER,
  SAVE_REVIEW_USER,
  RESET_STATE,
  DELETE_PDF_SETTINGS,
} from "../constants/actionTypes";
import { IApiGroup, IApiSharingUser } from "../interface";

export interface IStoreState {
  loader: boolean;
  error: boolean;
  message: string;
  sharings: any[];
  groups: IApiGroup[];
  users: IApiSharingUser[];
  sharing: any;
  total: number;
  loaded: boolean;
  selectedSharing: string[][];
  reviewUser: string[][];
  requestUser: string[][];
}
const INITIAL_STATE: IStoreState = {
  loader: false,
  error: false,
  sharing: {},
  message: "string",
  groups: [],
  users: [],
  sharings: [],
  total: 0,
  loaded: false,
  selectedSharing: [],
  reviewUser: [],
  requestUser: [],
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
      return { ...INITIAL_STATE };
    }
    case SET_SHARINGS: {
      const { users, groups } = payload;
      return {
        ...state,
        loader: false,
        loaded: true,
        users,
        groups,
      };
    }
    case ADD_SHARING_LOCAL: {
      const { value } = payload;
      return {
        ...state,
        sharings: [...state.sharings, value],
      };
    }

    case EDIT_SHARING_LOCAL: {
      const { index, value } = payload;
      const clone = [...state.sharings];
      clone[index] = value;
      return {
        ...state,
        sharings: clone,
      };
    }

    case REMOVE_SHARING_LOCAL: {
      const { index } = payload;
      const newSharings = [...state.sharings];
      newSharings.splice(index, 1);
      return {
        ...state,
        sharings: newSharings,
      };
    }

    case SET_SHARING_LOADER: {
      const { loader = false, error = false, message = "" } = payload;
      return {
        ...state,
        loader,
        error,
        message,
      };
    }

    case SET_SINGLE_SHARINGS: {
      return {
        ...state,
        sharing: payload,
      };
    }

    case SAVE_SHARINGS: {
      const { index = 0, selectedSharing = [] } = payload;
      const cloned = [...state.selectedSharing];
      cloned[index] = selectedSharing;
      return {
        ...state,
        selectedSharing: cloned,
      };
    }

    case SAVE_REQUEST_USER: {
      const { index = 0, requestUser = [] } = payload;
      const cloned = [...state.requestUser];
      cloned[index] = requestUser;
      return {
        ...state,
        requestUser: cloned,
      };
    }

    case SAVE_REVIEW_USER: {
      const { index = 0, reviewUser = [] } = payload;
      const cloned = [...state.reviewUser];
      cloned[index] = reviewUser;
      return {
        ...state,
        reviewUser: cloned,
      };
    }

    case DELETE_PDF_SETTINGS: {
      const { index } = payload;
      const selectedSharing = [...state.selectedSharing];
      selectedSharing.splice(index, 1);
      return {
        ...state,
        selectedSharing,
      };
    }

    default:
      return state;
  }
};

export default reducer;
