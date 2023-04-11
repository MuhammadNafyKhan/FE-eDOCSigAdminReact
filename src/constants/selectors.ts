import { IStoreState } from "../reducers/index";
export const user = (state: IStoreState) => state.auth.user;
export const token = (state: IStoreState) => state.auth.token;
export const ip = (state: IStoreState) => state.auth.ip;
