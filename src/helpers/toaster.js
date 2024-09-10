import { toast } from "react-toastify";

export class Toaster {
  static success(message, options) {
    toast.success(message, { ...options });
  }
  static error(message, options) {
    toast.error(message, { ...options });
  }
  static info(message, options) {
    toast.info(message, { ...options });
  }
  static warn(message, options) {
    toast.warn(message, { ...options });
  }
}
