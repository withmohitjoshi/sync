"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { initialValues, loginSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormInitialValuesT } from "./types";
import { apiClient } from "@/lib/interceptor";
import { useRouter } from "next/navigation";
import { Button, PasswordInputField, TextInputField } from "@/components";
import { Box, Container, Typography } from "@mui/material";

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInitialValuesT> = async (
    data: LoginFormInitialValuesT
  ) => {
    const response = await apiClient({
      method: "POST",
      url: "auth/login",
      data,
    });
    const token = response?.data?.data?.token;
    if (token) {
      router.push(`/verify-email?token=${token}`);
    } else {
      router.replace(`/`);
    }
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography variant="h1">Login</Typography>
      <TextInputField
        {...register("email")}
        error={errors.email?.message}
        label="Email"
        placeholder="Enter your email"
        type="email"
      />
      <PasswordInputField
        {...register("password")}
        error={errors.password?.message}
        label="Password"
        placeholder="Enter your password"
      />
      <Button type="submit" disabled={!isValid}>
        Submit
      </Button>
      <Typography component={"p"}>
        Don&#39;t have an account?
        <Typography component={"span"} mx={1}>
          SignUp
        </Typography>
      </Typography>
    </Box>
  );
};

export default LoginPage;
