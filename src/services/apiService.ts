import axios from "axios";
import store from "../store/store";
import {
  onLogout,
  updateActivityTimeout,
  updateLogoutTimeout,
  updateActivityModal,
} from "../actions/auth";
import { shouldLogout } from "../helpers/shouldLogout";
import {
  API_BASE_URL,
  LOGOUT_TIMEOUT,
  ACTIVITY_TIMEOUT,
  UPLOAD_URL,
} from "../constants";
import { createNotification, IActionType } from "../helpers/notificationHelper";
interface IBody {
  [key: string]: any;
}
export class ApiService {
  public static get = async (path: string) => {
    const url = path.includes("http") ? path : API_BASE_URL + path;
    const res = await axios.get(url);
    if (res.data && res.data.error) {
      const result = shouldLogout(res.data.error);
      if (result) {
        createNotification(IActionType.error, res.data.error, false);
        store.dispatch(onLogout());
      }
    } else {
      const logoutTimeout = setTimeout(() => {
        createNotification(IActionType.error, "Session timeout", false);
        store.dispatch(onLogout());
      }, LOGOUT_TIMEOUT);
      const lastActivityTimeout = setTimeout(() => {
        store.dispatch(updateActivityModal(true));
      }, ACTIVITY_TIMEOUT);
      store.dispatch(updateLogoutTimeout(logoutTimeout));
      store.dispatch(updateActivityTimeout(lastActivityTimeout));
    }
    return res.data;
  };

  public static post = async (path: string, body: IBody) => {
    const url = path.includes("http") ? path : API_BASE_URL + path;
    const res = await axios.post(url, body);
    if (res.data && res.data.error) {
      const result = shouldLogout(res.data.error);
      if (result) {
        createNotification(IActionType.error, res.data.error, false);
        store.dispatch(onLogout());
      }
    } else {
      const logoutTimeout = setTimeout(() => {
        createNotification(IActionType.error, "Session timeout", false);
        store.dispatch(onLogout());
      }, LOGOUT_TIMEOUT);
      const lastActivityTimeout = setTimeout(() => {
        store.dispatch(updateActivityModal(true));
      }, ACTIVITY_TIMEOUT);
      store.dispatch(updateLogoutTimeout(logoutTimeout));
      store.dispatch(updateActivityTimeout(lastActivityTimeout));
    }
    return res.data;
  };

  public static patch = async (path: string, body: IBody) => {
    const url = path.includes("http") ? path : API_BASE_URL + path;
    const res = await axios.patch(url, body);
    if (res.data && res.data.error) {
      const result = shouldLogout(res.data.error);
      if (result) {
        createNotification(IActionType.error, res.data.error, false);
        store.dispatch(onLogout());
      }
    } else {
      const logoutTimeout = setTimeout(() => {
        createNotification(IActionType.error, "Session timeout", false);
        store.dispatch(onLogout());
      }, LOGOUT_TIMEOUT);
      const lastActivityTimeout = setTimeout(() => {
        store.dispatch(updateActivityModal(true));
      }, ACTIVITY_TIMEOUT);
      store.dispatch(updateLogoutTimeout(logoutTimeout));
      store.dispatch(updateActivityTimeout(lastActivityTimeout));
    }
    return res.data;
  };

  public static delete = async (path: string) => {
    const url = path.includes("http") ? path : API_BASE_URL + path;
    const res = await axios.delete(url);
    if (res.data && res.data.error) {
      const result = shouldLogout(res.data.error);
      if (result) {
        createNotification(IActionType.error, res.data.error, false);
        store.dispatch(onLogout());
      }
    } else {
      const logoutTimeout = setTimeout(() => {
        createNotification(IActionType.error, "Session timeout", false);
        store.dispatch(onLogout());
      }, LOGOUT_TIMEOUT);
      const lastActivityTimeout = setTimeout(() => {
        store.dispatch(updateActivityModal(true));
      }, ACTIVITY_TIMEOUT);
      store.dispatch(updateLogoutTimeout(logoutTimeout));
      store.dispatch(updateActivityTimeout(lastActivityTimeout));
    }
    return res.data;
  };

  public static upload = async (
    body: FormData,
    onProgress?: (p: any) => void
  ) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const res = await axios.post(UPLOAD_URL, body, {
      ...config,
      onUploadProgress: onProgress,
    });

    if (res.data && res.data.error) {
      const result = shouldLogout(res.data.error);
      if (result) {
        createNotification(IActionType.error, res.data.error, false);
        store.dispatch(onLogout());
      }
    } else {
      if (res.data.status === false) {
        const result = shouldLogout(res.data.message);
        if (result) {
          createNotification(IActionType.error, res.data.message, false);
          store.dispatch(onLogout());
        }
      } else {
        const logoutTimeout = setTimeout(() => {
          createNotification(IActionType.error, "Session timeout", false);
          store.dispatch(onLogout());
        }, LOGOUT_TIMEOUT);
        const lastActivityTimeout = setTimeout(() => {
          store.dispatch(updateActivityModal(true));
        }, ACTIVITY_TIMEOUT);
        store.dispatch(updateLogoutTimeout(logoutTimeout));
        store.dispatch(updateActivityTimeout(lastActivityTimeout));
      }
    }
    return res.data;
  };
}
