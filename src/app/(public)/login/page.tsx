"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { initialValues, loginSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormInitialValuesT } from "./types";
import { apiClient } from "@/lib/interceptor";
import { useRouter } from "next/navigation";
import {
  FormSubmitButton,
  NavLink,
  PasswordInputField,
  TextInputField,
} from "@/components";
import { Box, Typography } from "@mui/material";
import theme from "@/theme/theme.config";
import { GenerateAlert } from "@/providers/AlertContext";

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginFormInitialValuesT> = async (
    data: LoginFormInitialValuesT
  ) => {
    setIsSubmitting(true);
    const response = await apiClient({
      method: "POST",
      url: "auth/login",
      data,
    });
    const token = response.data?.data?.token;
    if (token) {
      new GenerateAlert({
        message: response.data?.message,
      });
      router.push(`/verify-email?token=${token}`);
    } else if (response.status === 200) {
      router.replace(`/`);
    }
    setIsSubmitting(false);
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(4),
      }}
    >
      <Typography variant="h2">Login</Typography>
      <TextInputField
        {...register("email")}
        error={errors.email?.message}
        label="Email"
        placeholder="Enter your email"
        type="email"
      />
      <Box display={"flex"} alignItems={"end"} flexDirection={"column"}>
        <PasswordInputField
          {...register("password")}
          error={errors.password?.message}
          label="Password"
          placeholder="Enter your password"
        />
        <NavLink href={"/forgot-password"} prefetch>
          Forgot Password
        </NavLink>
      </Box>
      <FormSubmitButton disabled={!isValid} isPending={isSubmitting}>
        Submit
      </FormSubmitButton>
      <NavLink href={"/signup"} prefetch>
        Don&#39;t have an account? SignUp
      </NavLink>
    </Box>
  );
};

export default LoginPage;
