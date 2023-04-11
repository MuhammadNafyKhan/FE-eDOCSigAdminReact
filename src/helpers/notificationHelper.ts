// @ts-ignore
import { toast, ToastPosition } from "react-toastify";
export enum IActionType {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}

export const createNotification = (
  type: IActionType,
  message: string,
  autoclose: boolean | number = 3000,
  position: ToastPosition = "top-right"
) => {
  const autoClose = autoclose === false ? false : 3000;
  switch (type) {
    case "info":
      toast.info(message, { autoClose, position });
      break;
    case "success":
      toast.success(message, { autoClose, position });
      break;
    case "warning":
      toast.warning(message, { autoClose, position });
      break;
    case "error":
      toast.error(message, { autoClose, position });
      break;
  }
};
