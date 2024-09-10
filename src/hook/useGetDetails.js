import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/interceptor";

const useGetDetails = () => {
  return useQuery({
    queryKey: ["get-details"],
    queryFn: () =>
      apiClient({
        method: "GET",
        url: "user/get-details",
      }),
    select: (data) => data?.data?.data,
  });
};
export default useGetDetails;
