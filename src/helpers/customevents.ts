import { AlertBoxT } from "@/providers/AlertProvider";
import { CUSTOMEVENTS } from "./enums";

export const dispatchAddAlert = (data: Omit<AlertBoxT, "timestamp">) =>
  document.dispatchEvent(
    new CustomEvent(CUSTOMEVENTS.ADD_ALERT, {
      detail: data,
    })
  );
