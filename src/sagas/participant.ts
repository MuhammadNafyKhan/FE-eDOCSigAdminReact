import { all, fork, put, takeLatest } from "redux-saga/effects";
import { ADD_PARTICIPANT } from "../constants/actionTypes";
import { addParticipantStore } from "../actions/participant";

interface IAction {
  type: string;
  payload?: any;
}

function* addParticipantSaga({ payload }: IAction) {
  yield put(addParticipantStore(payload));
}

function* watchOnAddParticipant() {
  yield takeLatest(ADD_PARTICIPANT, addParticipantSaga);
}

export default function* rootSaga() {
  yield all([fork(watchOnAddParticipant)]);
}
