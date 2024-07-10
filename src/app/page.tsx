import { apiClient } from "@/lib/interceptor";

export default async function Home() {
  const data = await apiClient({
    method: "GET",
    url: "user/get-user",
  });
  return (
    <div>
      HomePage
      {JSON.stringify(data.data)}
    </div>
  );
}
