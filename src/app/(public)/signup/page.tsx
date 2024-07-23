"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { initialValues, signupSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormInitialValuesT } from "./types";
import { apiClient } from "@/lib/interceptor";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import {
  FormSubmitButton,
  PasswordInputField,
  TextInputField,
} from "@/components";
import Link from "next/link";
import { useState } from "react";

const SignupPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignupFormInitialValuesT> = async (
    data: SignupFormInitialValuesT
  ) => {
    try {
      setIsSubmitting(true);
      const response = await apiClient({
        method: "POST",
        url: "auth/signup",
        data,
      });
      const token = response.data?.data?.token;
      if (token) {
        router.push(`/verify-email?token=${token}`);
      }
    } finally {
      setIsSubmitting(true);
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
      <Typography variant="h2">Signup</Typography>
      <TextInputField
        {...register("username")}
        error={errors.username?.message}
        label="Username"
        placeholder="Enter your username"
        type="text"
      />
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
      <FormSubmitButton
        disabled={!isValid}
        isPending={isSubmitting}
      >
        Submit
      </FormSubmitButton>
      <Link href="/login" prefetch={true}>
        Already have an account? Login
      </Link>
    </Box>
  );
};

export default SignupPage;
