'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { initialValues, signupSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormInitialValuesT } from './types';
import { apiClient } from '@/lib/interceptor';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignupFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormInitialValuesT> = async (data: SignupFormInitialValuesT) => {
    const response = await apiClient({
      method: 'POST',
      url: 'auth/signup',
      data,
    });
    const token = response.data?.data?.token;
    if (token) {
      router.push(`/verify-email?token=${token}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Username</label>
      <input {...register('username')} type='text' />
      <label>Email</label>
      <input {...register('email')} type='email' />
      <label>Password</label>
      <input {...register('password')} type='password' />
      <button type='submit' disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default SignupPage;
