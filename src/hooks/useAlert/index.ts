import { AlertBoxT, AlertContext } from "@/providers/AlertContext";
import { useContext } from "react";

export const useAlert = () => {
  const { addAlert } = useContext(AlertContext);
  const handleAddAlert = ({ detail }: any) => {
    addAlert(detail);
  };
  return { handleAddAlert };
};
