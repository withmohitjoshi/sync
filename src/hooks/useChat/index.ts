import { ChatContext } from "@/providers/ChatContextProvider";
import { useContext } from "react";

export const useChat = () => useContext(ChatContext)
