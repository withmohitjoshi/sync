import { STATUSCODES } from "@/helpers/enums";
import { sendResponse } from "@/helpers/functions";

export const errorHandler = ({ error, status, data }: any) => {
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
    default:
      return sendResponse({
        title: "Server Error",
        status: 500,
        message: "Server Error",
      });
  }
};
