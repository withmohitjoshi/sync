'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { initialValues, verifyEmailSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifyEmailFormInitialValuesT } from './types';
import { apiClient } from '@/lib/interceptor';
import { useRouter } from 'next/navigation';
import { AppRouterPagePropsT } from '@/helpers/types';

const VerifyEmailPage = ({ searchParams }: AppRouterPagePropsT) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<VerifyEmailFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit: SubmitHandler<VerifyEmailFormInitialValuesT> = async (data: VerifyEmailFormInitialValuesT) => {
    if (searchParams?.token) {
      const response = await apiClient({
        headers: {
          Authorization: `Bearer ${searchParams.token}`,
        },
        method: 'POST',
        url: 'auth/verify-email',
        data,
      });
      if (response.status === 200) {
        router.push('/login');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Code</label>
      <input {...register('code')} type='text' />
      <button
        type='button'
        onClick={() => {
          console.log('hello');
        }}
      >
        Resend Email
      </button>
      <button type='submit' disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default VerifyEmailPage;
