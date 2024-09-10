import "client-only";
import { CUSTOMEVENTS } from "./constants";

export const dispatchRefetchQuery = (queryKey) =>
  document.dispatchEvent(
    new CustomEvent(CUSTOMEVENTS.REFETCH_QUERY, {
      detail: queryKey,
    })
  );
