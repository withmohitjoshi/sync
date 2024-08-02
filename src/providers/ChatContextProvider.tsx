"use client";

import { createContext, useState } from "react";

export const ChatContext = createContext<any>(null);

export const ChatContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [state, setState] = useState({
    currentChatWith: "",
  });

  return (
    <ChatContext.Provider value={{ state, setState }}>
      {children}
    </ChatContext.Provider>
  );
};
