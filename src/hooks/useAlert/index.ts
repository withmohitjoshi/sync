import { AlertBoxT, AlertContext } from "@/providers/AlertContext";
import { useContext } from "react";

export const useAlert = () => {
  const { addAlert } = useContext(AlertContext);
  const handleAddAlert = ({
    detail,
  }: {
    detail: Omit<AlertBoxT, "timestamp">;
  }) => {
    addAlert(detail);
  };
  return { handleAddAlert };
};
