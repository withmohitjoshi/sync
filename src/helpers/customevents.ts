import { AlertBoxT } from "@/providers/AlertContext";
import { CUSTOMEVENTS } from "./enums";

export const dispatchAddAlert = (data: Omit<AlertBoxT, "timestamp">) =>
  document.dispatchEvent(
    new CustomEvent(CUSTOMEVENTS.ADD_ALERT, {
      detail: data,
    })
  );
