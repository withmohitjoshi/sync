import { SocketContext } from "@/providers/SocketContext";
import { useContext } from "react";

export const useSocket = () => useContext(SocketContext);
