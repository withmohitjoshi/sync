"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { initialValues, loginSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormInitialValuesT } from "./types";
import { apiClient } from "@/lib/interceptor";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm<LoginFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInitialValuesT> = async (
    data: LoginFormInitialValuesT
  ) => {
    await apiClient({
      method: "POST",
      url: "auth/login",
      data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input {...register("email")} type="email" />
      <label>Password</label>
      <input {...register("password")} type="password" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginPage;
