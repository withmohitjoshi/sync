import { AlertBoxT } from "@/providers/AlertContext";
import { CUSTOMEVENTS } from "./enums";

export const addAlertEvent = (data: Omit<AlertBoxT, "timestamp">) =>
  new CustomEvent(CUSTOMEVENTS.ADD_ALERT, {
    detail: data,
  });
