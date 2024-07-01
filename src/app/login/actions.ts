'use server';

import { apiClient } from '@/lib/interceptor';

export const loginAction = async (data: any) => {
  const { payload } = Object.fromEntries(data);

  return await apiClient({
    method: 'POST',
    url: 'auth/login',
    data: payload,
  });
  return { data };
};
