import {
  UPDATE_HEADER_TITLE,
  UPDATE_CURRENT_PAGE,
  UPDATE_CURRENT_DOC,
  UPDATE_REVIEW_DOC,
  UPDATE_REQUESTED_DOC,
  UPDATE_AUTH_CHECK,
  UPDATE_PDF_SETTINGS,
  USER_LOGOUT,
  UPDATE_INDEX,
  RESET_INDEX,
  RESET_STATE,
  DELETE_PDF_SETTINGS,
} from "../constants/actionTypes";

export interface IStoreState {
  header_title: string;
  current_page: number;
  index: number;
  current_doc: number;
  current_review_doc: number;
  current_requested_doc: number;
  auth_checking: boolean;
  pdf_setted: boolean[];
  maxx: number[];
  maxy: number[];
  total: number[];
}

const INITIAL_STATE: IStoreState = {
  header_title: "",
  current_page: 0,
  index: 0,
  current_doc: 0,
  current_review_doc: 0,
  current_requested_doc: 0,
  auth_checking: false,
  pdf_setted: [false],
  maxx: [],
  maxy: [],
  total: [],
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

    case UPDATE_HEADER_TITLE:
      return {
        ...state,
        header_title: payload.header_title,
      };

    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        current_page: payload.current_page,
      };
    case UPDATE_CURRENT_DOC:
      return {
        ...state,
        current_doc: state.current_doc + 1,
      };

    case UPDATE_REVIEW_DOC:
      return {
        ...state,
        current_review_doc: state.current_review_doc + 1,
      };

    case UPDATE_REQUESTED_DOC:
      return {
        ...state,
        current_requested_doc: state.current_requested_doc + 1,
      };

    case UPDATE_AUTH_CHECK:
      return {
        ...state,
        auth_checking: payload,
      };

    case UPDATE_PDF_SETTINGS: {
      const { index = 0, maxx, maxy, total } = payload;
      const maxx_value = [...state.maxx];
      const maxy_value = [...state.maxy];
      const spdf = [...state.pdf_setted];
      maxx_value[index] = maxx;
      maxy_value[index] = maxy;
      spdf[index] = true;
      const newTotal = [...state.total];
      newTotal[index] = total;
      return {
        ...state,
        maxx: maxx_value,
        maxy: maxy_value,
        pdf_setted: spdf,
        total: newTotal,
      };
    }
    case UPDATE_INDEX:
      return {
        ...state,
        index: state.index + 1,
      };

    case DELETE_PDF_SETTINGS: {
      const maxx = [...state.maxx];
      const maxy = [...state.maxy];
      const pdf_setted = [...state.pdf_setted];
      const { index = 0 } = payload;
      maxx.splice(index, 1);
      maxy.splice(index, 1);
      let current_doc = state.current_doc;
      if (current_doc > 0) {
        current_doc--;
      }
      pdf_setted.splice(index, 1);
      return {
        ...state,
        maxx,
        maxy,
        pdf_setted,
        current_doc,
      };
    }

    case RESET_INDEX:
      return {
        ...state,
        index: 0,
        current_doc: 0,
        current_review_doc:0,
        current_requested_doc:0,
      };


    default:
      return state;
  }
};
export default reducer;
