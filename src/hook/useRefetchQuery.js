import { useQueryClient } from "@tanstack/react-query";

const useRefetchQuery = () => {
  const qc = useQueryClient();
  const handleRefetchQuery = ({ detail }) => {
    qc.refetchQueries({
      queryKey: [detail],
    });
  };
  return { handleRefetchQuery };
};
export default useRefetchQuery;
