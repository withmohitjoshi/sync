import { SocketContext } from "@/providers/SocketContextProvider";
import { useContext } from "react";

export const useSocket = () => useContext(SocketContext);
