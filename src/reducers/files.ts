import {
  ADD_FILE,
  REMOVE_FILE,
  EDIT_FILE,
  SET_FILES,
  USER_LOGOUT,
  RESET_STATE,
  REMOVE_SIGNER,
  SAVE_PDF_IMAGES,
  DELETE_PDF_SETTINGS,
} from "../constants/actionTypes";
import { IRequestDoc, IReviewDoc, ISigningDoc, IPDFImage } from "../interface";

export interface IStoreState {
  loader: boolean;
  error: boolean;
  message: string;
  count: number;
  current_package_name: string;
  requested_docs: IRequestDoc[];
  review_docs: IReviewDoc[];
  sigining_docs: ISigningDoc[];
  pdf_images: IPDFImage[][];
}
const INITIAL_STATE: IStoreState = {
  loader: false,
  error: false,
  message: "string",
  count: 0,
  current_package_name: "",
  requested_docs: [],
  review_docs: [],
  sigining_docs: [],
  pdf_images: [],
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

    case ADD_FILE: {
      return {
        ...state,
        count: state.count + 1,
      };
    }

    case EDIT_FILE: {
      return {
        ...state,
      };
    }

    case REMOVE_FILE: {
      return {
        ...state,
        count: state.count - 1,
      };
    }

    case REMOVE_SIGNER: {
      return {
        ...state,
        sigining_docs: payload,
      };
    }
    case SAVE_PDF_IMAGES: {
      const clone = [...state.pdf_images];
      clone.push(payload);
      return {
        ...state,
        pdf_images: clone,
      };
    }

    case DELETE_PDF_SETTINGS: {
      const { index } = payload;
      const clone = [...state.pdf_images];
      clone.splice(index, 1);
      return {
        ...state,
        pdf_images: clone,
      };
    }

    case SET_FILES: {
      const {
        requested_docs = [],
        review_docs = [],
        sigining_docs = [],
      } = payload;
      const count =
        requested_docs.length + review_docs.length + sigining_docs.length;
      return {
        ...state,
        ...payload,
        count,
      };
    }

    default:
      return state;
  }
};

export default reducer;
