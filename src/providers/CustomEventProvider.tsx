"use client";
import { CUSTOMEVENTS } from "@/helpers/enums";
import { useAlert, useRefetchQuery } from "@/hooks";
import { useEffect } from "react";

export const CustomEventProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { handleAddAlert } = useAlert();
  const { handleRefetchQuery } = useRefetchQuery();
  useEffect(() => {
    document.addEventListener(CUSTOMEVENTS.ADD_ALERT, handleAddAlert);
    document.addEventListener(CUSTOMEVENTS.REFETCH_QUERY, handleRefetchQuery);
    return () => {
      document.removeEventListener(CUSTOMEVENTS.ADD_ALERT, handleAddAlert);
      document.removeEventListener(
        CUSTOMEVENTS.REFETCH_QUERY,
        handleRefetchQuery
      );
    };
  }, [handleAddAlert, handleRefetchQuery]);

  return children;
};
