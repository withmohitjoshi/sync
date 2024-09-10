import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/interceptor";

const obj = {
  connections: "connections-list",
  send: "send-list",
  received: "received-list",
};
const useGetConnectionsList = (type) => {
  return useQuery({
    queryKey: [obj[type]],
    queryFn: () =>
      apiClient({
        method: "GET",
        url: `connections/${obj[type]}`,
      }),
    select: (data) => data?.data?.data,
  });
};
export default useGetConnectionsList;
