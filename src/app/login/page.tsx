'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { initialValues, loginSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormInitialValuesT } from './types';
import { loginAction } from './actions';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInitialValuesT> = async (data: LoginFormInitialValuesT, e) => {
    const formData = new FormData(e?.target);
    console.log({ e });

    return;
    const resp = await loginAction(data);
    console.log({ resp });

    // return await fetch('/api/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
  };

  console.log({ errors });

  // <form onSubmit={handleSubmit(onSubmit)}>
  return (
    <form action={loginAction}>
      <label>Email</label>
      <input {...register('email')} type='email' />
      <label>Password</label>
      <input {...register('password')} type='password' />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default LoginPage;
