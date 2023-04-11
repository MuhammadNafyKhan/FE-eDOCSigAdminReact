import {
  ADD_PARTICIPANT,
  REMOVE_PARTICIPANT,
  EDIT_PARTICIPANT,
  UPDATE_TOTAL_PARTICIPANT,
  SAVE_PARTICIPANT,
  USER_LOGOUT,
  RESET_STATE,
} from "../constants/actionTypes";
import {
  createNotification,
  IActionType as INotificationActions,
} from "../helpers/notificationHelper";
import { IParticipants } from "../interface";
export interface IStoreState {
  loader: boolean;
  error: boolean;
  message: string;
  count: number;
  participants: IParticipants[];
  total: number;
  savedCount: number;
}
const INITIAL_STATE: IStoreState = {
  loader: false,
  error: false,
  message: "string",
  count: 0,
  participants: [],
  total: 0,
  savedCount: 0,
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
    case UPDATE_TOTAL_PARTICIPANT: {
      return {
        ...state,
        total: state.total + 1,
      };
    }
    case ADD_PARTICIPANT: {
      const { value } = payload;
      createNotification(
        INotificationActions.success,
        "Participant Added.",
        2000,
        "bottom-right"
      );
      return {
        ...state,
        count: state.count + 1,
        participants: [...state.participants, value],
        total: state.total + 1, //to manage ids
        savedCount: state.savedCount + 1,
      };
    }

    case EDIT_PARTICIPANT: {
      const { value } = payload;
      let savedCount = state.savedCount;
      const { key, isSaved } = value as IParticipants;
      if (!isSaved) {
        value.isSaved = true;
        savedCount++;
      }
      const clone = [...state.participants];
      const index = clone.findIndex((p) => p.key === key);
      if (index > -1) {
        clone[index] = value;
      }

      createNotification(
        INotificationActions.success,
        "Participant Updated.",
        2000,
        "bottom-right"
      );
      return {
        ...state,
        participants: clone,
        savedCount,
      };
    }

    case REMOVE_PARTICIPANT: {
      const { key } = payload;
      const newParticipant = [...state.participants];
      let savedCount = state.savedCount;
      const index = newParticipant.findIndex((p) => p.key === key);
      if (index > -1) {
        const [removed] = newParticipant.splice(index, 1);
        if (removed && removed.isSaved) {
          savedCount--;
        }
      }
      createNotification(
        INotificationActions.success,
        "Participant Deleted.",
        2000,
        "bottom-right"
      );
      return {
        ...state,
        count: state.count - 1,
        participants: newParticipant,
        savedCount,
      };
    }

    case SAVE_PARTICIPANT: {
      const { participants = [] } = payload;
      const arr = [...state.participants];
      participants.forEach((p: IParticipants) => {
        if (
          !arr.find((a) => a.fullname === p.fullname && a.email === p.fullname)
        ) {
          arr.push({ ...p });
        }
        if (!arr.find((a) => a.display_name === p.display_name)) {
          arr.push(p);
        }
      });

      return {
        ...state,
        count: arr.length,
        total: arr.length,
        participants: arr,
      };
    }

    default:
      return state;
  }
};

export default reducer;
