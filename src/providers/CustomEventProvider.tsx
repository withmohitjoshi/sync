"use client";
import { CUSTOMEVENTS } from "@/helpers/enums";
import { useAlert } from "@/hooks";
import { useEffect } from "react";

export const CustomEventProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { handleAddAlert } = useAlert();
  useEffect(() => {
    document.addEventListener(CUSTOMEVENTS.ADD_ALERT, handleAddAlert);
    return () => {
      document.removeEventListener(CUSTOMEVENTS.ADD_ALERT, handleAddAlert);
    };
  }, [handleAddAlert]);

  return children;
};
