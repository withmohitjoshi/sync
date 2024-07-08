'use client';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { initialValues, verifyEmailSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifyEmailFormInitialValuesT } from './types';
import { apiClient } from '@/lib/interceptor';
import { useRouter } from 'next/navigation';
import { AppRouterPagePropsT } from '@/helpers/types';
import { resendEmail } from './actions';

let id: NodeJS.Timeout;
const VerifyEmailPage = ({ searchParams }: AppRouterPagePropsT) => {
  const [isResendEmailDisabled, setIsResendEmailDisabled] = useState(true);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<VerifyEmailFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(verifyEmailSchema),
  });

  useEffect(() => {
    if (isResendEmailDisabled) {
      id = setInterval(() => {
        const timer = document.getElementById('timer');
        if (timer && timer.textContent) {
          const timeLeft = parseInt(timer.textContent);
          if (timeLeft <= 0) {
            setIsResendEmailDisabled(false);
          } else {
            timer.textContent = String(timeLeft - 1);
          }
        }
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [isResendEmailDisabled]);

  const onSubmit: SubmitHandler<VerifyEmailFormInitialValuesT> = async (data: VerifyEmailFormInitialValuesT) => {
    alert('On submit get trigged');
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
        disabled={isResendEmailDisabled}
        type='button'
        onClick={async () => {
          if (isResendEmailDisabled === false) {
            if (searchParams?.token) {
              setIsResendEmailDisabled(true);
              const timer = document.getElementById('timer');
              if (timer) {
                timer.textContent = '60';
              }
              const resp = await resendEmail(searchParams?.token);
              if (resp.status === 200) {
                router.push(`/verifyemail?token=${resp?.data?.token}`);
              } else {
                setIsResendEmailDisabled(false);
                console.error({ resp });
              }
            }
          }
        }}
      >
        Resend Email
      </button>
      <div>
        <p id='timer'>60</p>
        <span>s</span>
      </div>
      <button type='submit' disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default VerifyEmailPage;
