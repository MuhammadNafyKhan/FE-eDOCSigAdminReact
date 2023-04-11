import { string } from "yup";
import {
  ADD_FORM_LOCAL,
  DELETE_PDF_SETTINGS,
  EDIT_FORM_LOCAL,
  REMOVE_FORM_LOCAL,
  RESET_STATE,
  SAVE_INDEXES,
  SET_FORMS,
  SET_FORM_LOADER,
  SET_SINGLE_FORMS,
  USER_LOGOUT,
} from "../constants/actionTypes";

export interface IStoreState {
  loader: boolean;
  error: boolean;
  message: string;
  forms: string[];
  targettables: { form: string; targettable: string }[];
  form: { fields: { fieldname: string; fieldtype: string }[] };
  total: number;
  values: { name: string; value: string }[][];
  targettable: string[];
}
const INITIAL_STATE: IStoreState = {
  loader: false,
  error: false,
  form: { fields: [] },
  message: "string",
  forms: [],
  total: 0,
  targettables: [],
  targettable: [],
  values: [],
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
      return { ...state, values: [], total: 0 };
    }
    case SET_FORMS: {
      console.log("Hi")
      const { forms, targettables } = payload;
      return {
        ...state,
        forms,
        targettables,
        loader: false,
      };
    }
    case ADD_FORM_LOCAL: {
      const { value } = payload;
      return {
        ...state,
        forms: [...state.forms, value],
      };
    }

    case EDIT_FORM_LOCAL: {
      const { index, value } = payload;
      const clone = [...state.forms];
      clone[index] = value;
      return {
        ...state,
        forms: clone,
      };
    }

    case REMOVE_FORM_LOCAL: {
      const { index } = payload;
      const newForms = [...state.forms];
      newForms.splice(index, 1);
      return {
        ...state,
        forms: newForms,
      };
    }

    case SET_FORM_LOADER: {
      const { loader = false, error = false, message = "" } = payload;
      return {
        ...state,
        loader,
        error,
        message,
      };
    }

    case SET_SINGLE_FORMS: {
      return {
        ...state,
        form: payload,
        loader: false,
      };
    }

    case SAVE_INDEXES: {
      const { index = 0, targettable, values } = payload;
      const { targettable: newTargetTable, values: newValues } = state;
      const clonedTable = [...newTargetTable];
      const clonedValues = [...newValues];
      clonedTable[index] = targettable;
      clonedValues[index] = values;
      return {
        ...state,
        targettable: clonedTable,
        values: clonedValues,
      };
    }

    case DELETE_PDF_SETTINGS: {
      const { index } = payload;
      const targettable = [...state.targettable];
      targettable.splice(index, 1);
      const values = [...state.values];
      targettable.splice(index, 1);
      return {
        ...state,
        targettable,
        values,
      };
    }

    default:
      return state;
  }
};

export default reducer;
