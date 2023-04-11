import { combineReducers } from "redux";
import authReducer, { IStoreState as IAuthState } from "./auth";
import settingsReducer, { IStoreState as ISettingsState } from "./settings";
import file, { IStoreState as IFilesState } from "./files";
import participantReducer, {
  IStoreState as IParticipantState,
} from "./participant";
import elementsReducer, { IStoreState as IElementState } from "./element";
import packageReducer, { IStoreState as IPackageState } from "./package";
import template, { IStoreState as ITemplateState } from "./template";
import form, { IStoreState as IFormState } from "./form";
import sharing, { IStoreState as ISharingState } from "./sharing";

export interface IStoreState {
  auth: IAuthState;
  settings: ISettingsState;
  participant: IParticipantState;
  elements: IElementState;
  file: IFilesState;
  packageState: IPackageState;
  template: ITemplateState;
  form: IFormState;
  sharing: ISharingState;
}
const rootReducer = combineReducers<IStoreState>({
  auth: authReducer,
  settings: settingsReducer,
  participant: participantReducer,
  elements: elementsReducer,
  file,
  packageState: packageReducer,
  template,
  form,
  sharing,
});

export default rootReducer;
