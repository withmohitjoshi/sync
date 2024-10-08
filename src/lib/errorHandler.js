import { STATUSCODES } from "../helpers/constants";
import { sendResponse } from "./server-utils";

export const errorHandler = ({ error, status, data }) => {
  switch (status) {
    case STATUSCODES.BAD_REQUEST:
      return sendResponse({
        title: "Bad Request",
        status,
        message: error,
        data,
      });
    case STATUSCODES.CONFLICT:
      return sendResponse({
        title: "Duplicated found",
        status,
        message: error,
        data,
      });
    case STATUSCODES.UNAUTHORIZED:
      return sendResponse({
        title: "Unauthorized",
        status,
        message: error,
        data,
      });
    case STATUSCODES.FORBIDDEN:
      return sendResponse({
        title: "Forbidden",
        status,
        message: error,
        data,
      });
    case STATUSCODES.NOT_FOUND:
      return sendResponse({
        title: "Not Found",
        status,
        message: error,
        data,
      });
    case STATUSCODES.SERVER_ERROR:
      return sendResponse({
        title: "Server Error",
        status,
        message: error,
        data,
      });
    case STATUSCODES.EXPIRED:
      return sendResponse({
        title: "Expired",
        status,
        message: error,
        data,
      });
    default:
      return sendResponse({
        title: "Server Error",
        status: 500,
        message: "Server Error",
      });
  }
};
