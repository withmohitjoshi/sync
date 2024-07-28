import { useQueryClient } from "@tanstack/react-query";

export const useRefetchQuery = () => {
  const queryClient = useQueryClient();
  const handleRefetchQuery = ({ detail }: any) => {
    queryClient.refetchQueries(detail);
  };
  return { handleRefetchQuery };
};
