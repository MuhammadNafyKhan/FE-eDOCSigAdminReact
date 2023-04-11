const port = 4500;
const host = "http://127.0.0.1:";
const userPath = "/api/user/";
export const apiPaths = {
  modifyPdf: host + port + userPath + "modifyPdf",
  uploadFile: host + port + userPath + "uploadFile",
  loginAdmin: host+port+userPath+"loginAdmin"
};