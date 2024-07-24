import { AlertContext } from "@/providers/AlertContext";
import { useContext } from "react";

export const useAlert = () => useContext(AlertContext);
