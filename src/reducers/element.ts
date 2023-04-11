import {
  ADD_ELEMENT,
  REMOVE_ELEMENT,
  EDIT_ELEMENT,
  SET_ELEMENT,
  SET_ELEMENT_ARRAY,
  USER_LOGOUT,
  RESET_STATE,
  DELETE_PDF_SETTINGS,
  REMOVE_PARTICIPANT,
} from "../constants/actionTypes";
import {
  createNotification,
  IActionType as INotificationActions,
} from "../helpers/notificationHelper";
import { IElement } from "../interface";

export interface IStoreState {
  loader: boolean;
  error: boolean;
  message: string;
  element: IElement[][];
  total: number;
  elementStatus: boolean[];
}
const INITIAL_STATE: IStoreState = {
  loader: false,
  error: false,
  message: "",
  element: [],
  total: 0,
  elementStatus:[],
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

    case SET_ELEMENT: {
      const { index, element = [], elementStatus = [], total, showNotification = true } = payload;
      const value = [...state.element];
      value[index] = element;
      const entry = [...state.elementStatus];
      entry[index] = true;

      if (showNotification) {
        createNotification(
          INotificationActions.success,
          "Elements Saved",
          2000,
          "bottom-right"
        );
      }
      return {
        ...state,
        element: value,
        elementStatus:entry,
        total,
      };
    }

    case SET_ELEMENT_ARRAY: {
      console.log("Payload: ",payload)
      const { index, elementStatus = [] } = payload;
      const arr = new Array(index).fill(false);

      return {
        ...state,
        elementStatus:arr,
      };
    }
    
    case ADD_ELEMENT: {
      const { value } = payload;
      return {
        ...state,
        element: [...state.element, value],
      };
    }

    case EDIT_ELEMENT: {
      const { index, value } = payload;
      const clone = [...state.element];
      clone[index] = value;
      return {
        ...state,
        element: clone,
      };
    }

    case REMOVE_ELEMENT: {
      const { index } = payload;
      const newElement = [...state.element];
      newElement.splice(index, 1);
      return {
        ...state,

        element: newElement,
      };
    }

    case DELETE_PDF_SETTINGS: {
      const { index } = payload;
      const element = [...state.element];
      element.splice(index, 1);
      return {
        ...state,
        element,
      };
    }

    case REMOVE_PARTICIPANT: {
      const { key } = payload;
      const element = [...state.element];
      element.forEach((els, i) => {
        const arr = els.filter((el) => el.signer !== key);
        element[i] = arr;
      });
      return {
        ...state,
        element,
      };
    }

    default:
      return state;
  }
};

export default reducer;
