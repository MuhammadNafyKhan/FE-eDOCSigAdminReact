import {
  ADD_PARTICIPANT,
  EDIT_PARTICIPANT,
  REMOVE_PARTICIPANT,
  ADD_PARTICIPANT_STORE,
  UPDATE_TOTAL_PARTICIPANT,
  SAVE_PARTICIPANT,
} from "../constants/actionTypes";

export const addParticipant = (payload?: any) => {
  return {
    type: ADD_PARTICIPANT,
    payload,
  };
};

export const editParticipant = (payload?: any) => {
  return {
    type: EDIT_PARTICIPANT,
    payload,
  };
};

export const removeParticipant = (payload?: any) => {
  return {
    type: REMOVE_PARTICIPANT,
    payload,
  };
};

export const addParticipantStore = (payload?: any) => {
  return {
    type: ADD_PARTICIPANT_STORE,
    payload,
  };
};

export const updateTotalParticipant = (payload?: any) => {
  return {
    type: UPDATE_TOTAL_PARTICIPANT,
    payload,
  };
};

export const saveParticipant = (payload?: any) => {
  return {
    type: SAVE_PARTICIPANT,
    payload,
  };
};
