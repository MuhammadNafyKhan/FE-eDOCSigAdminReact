export interface IApiTemplate {
  id: string;
  name: string;
  createdon: string;
  createdby: string;
  notificationname: string;
  notificationemail: string;
  type: string;
  message: string;
  pages: number;
  pagedata: string;
  offsetboxes: boolean;
  redirecturl: string;
  score?: number;
}

export interface IComparingTemp {
  id: string;
  name: string;
  type: string;
  message: string;
  pages: number;
  pagedata: string[][];
  score?: number;
}

export interface IApiCategorie {
  id: string;
  name: string;
}

export interface IApiPackage {
  id: string;
  name: string;
  status: string;
  createdby: string;
  fullname: string;
  sourceapp: string;
  created: string;
  modified: string;
  notificationname: string;
  notificationemail: string;
  redirecturl: string;
  forcename: boolean;
  documents: IApiDocuments[];
}

export interface IApiDocuments {
  docid: string;
  form: string;
  status: string;
  sourceapp: string;
  packageid: string;
  createdby: string;
  created: string;
}

export interface IApiGroup {
  groupid: string;
  groupname: string;
  description: string;
  assignedcontrolid: string;
}

export interface IApiSharingUser {
  username: string;
  fullname: string;
  userid: string;
}

export interface IApiSignset {
  signsetid: string;
  pkgid: string;
  signsetname: string;
  status: string;
  signerid: string;
  name: string;
  email: string;
  role: string;
  tier: number;
  authcode: string;
  cryptid: string;
  authcoderequired: string;
  verifyrequired: string;
  idprovider: string;
  rolehidden: string;
  required: string;
  delegate: boolean;
  createdby: string;
  createdon: string;
}

export interface IApiSigboxPending {
  //for pednig docs
  signsetid: string;
  boxid: number;
  role: string;
  signerid: number;
  page: number;
  xp: number;
  yp: number;
  hp: number;
  wp: number;
  type: number;
  text: string;
  checked: boolean;
  fieldname: string;
  fieldvalue: string;
  fieldlabel: string;
  defaultvalue: string;
  checkedvalue: string;
  uncheckedvalue: string;
  required: boolean;
  depfield: string;
  depfieldvalue: string;
  depoperator: string;
  font: string;
  fontsize: number;
  lineheight: number;
  fontcolor: string;
}

export interface IApiSigboxTemplate {
  //for templates
  left: string;
  top: string;
  width: string;
  height: string;
  esigntype: string;
  boxid: string;
  pagenumber: string;
  font: string;
  fontsize: string;
  lineheight: string;
  fontcolor: string;
  signsetid: string;
  fieldname: string;
  fieldvalue: string;
  fieldlabel: string;
  defaultvalue: string;
  depfield: string;
  depfieldvalue: string;
  depoperator: string;
  fieldrequired: string;
  checkedvalue: string;
  uncheckedvalue: string;
  role: string;
  signerid: number;
  page: number;
  xp: number;
  yp: number;
  hp: number;
  wp: number;
  type: number;
  text: string;
  checked: boolean;
  required: boolean;
}

export interface IParticipants {
  display_name: string;
  fullname: string;
  signing_order: string;
  email: string;
  text_number?: string;
  notification_type: string;
  auth_code: string;
  id_check: string;
  allow_delegation: string;
  key: string;
  color?: string;
  account?: string;
  isSaved?: boolean;
}

export interface IApiParticipant {
  id: string;
  name: string;
  email: string;
  authcode: string;
  tier: string;
  signsetid: string;
  notificationtype: string;
  notificationaccount: string;
  phone: string;
  verifyrequired: string;
  idprovider: string;
  status: string;
  paymentamount: string;
  paymentmessage: string;
  paymentstatus: string;
  extramessagetext: string;
  extramessageaction: string;
  signergroupid: string;
  delegate: boolean;
}

export interface IPendingDoc {
  docid: string;
  docname: string;
  createdon: string;
}

export interface ISigningDoc {
  display_name: string;
  is_template?: boolean;
  sharingids: any[];
  sigboxes: IApiSigboxTemplate[];
  signsets: IApiSignset[];
  targettable: string;
  triggerdefs: any[];
  uniqnm: string;
  tempId?: string;
}

export interface IReviewDoc {
  display_name: string;
  file_name: string;
  is_template?: boolean;
  sharingids: any[];
  sigboxes: IApiSigboxTemplate[];
  signsets: IApiSignset[];
  targettable: string;
  triggerdefs: any[];
  uniqnm: string;
}

export interface IRequestDoc {
  name: string;
  message: string;
}

export interface IElement {
  y: number;
  x: number;
  width: number;
  height: number;
  name: string;
  signer: string;
  options: IOptions[];
  id: string;
  type: string;
  required?: boolean;
  backgroundColor?: string;
  checkedvalue?: string;
  uncheckedvalue?: string;
  defaultvalue?: string;
}

export interface IOptions {
  label: string;
  value: string;
}

export interface IApiUser {
  controlid: string;
  username: string;
  userid: string;
  email: string;
  phonenumber: string;
  fullname: string;
  session: string;
  sessionlife: number;
  retentionperiod: number;
  availablemfoptions: string;
  multifactor: string;
  controlids: string[];
  permissions: string[];
}

export interface IApiEvent {
  id: string;
  type: string;
  nexttest: string;
  name: string;
  description: string;
}

export interface IPDFImage {
  image: string;
  width: number;
  height: number;
}
