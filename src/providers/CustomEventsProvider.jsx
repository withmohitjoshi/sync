"use client";
import { CUSTOMEVENTS } from "../helpers/constants";
import { useEffect } from "react";
import useRefetchQuery from "../hook/useRefetchQuery";

export const CustomEventsProvider = ({ children }) => {
  const { handleRefetchQuery } = useRefetchQuery();
  useEffect(() => {
    document.addEventListener(CUSTOMEVENTS.REFETCH_QUERY, handleRefetchQuery);
    return () => {
      document.removeEventListener(
        CUSTOMEVENTS.REFETCH_QUERY,
        handleRefetchQuery
      );
    };
  }, [handleRefetchQuery]);

  return children;
};
