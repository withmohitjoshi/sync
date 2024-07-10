import { apiClient } from '@/lib/interceptor';

export default async function Home() {
  await apiClient('user/get-user');
  return <div>HomePage</div>;
}
