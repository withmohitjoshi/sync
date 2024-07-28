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
  NavLink,
  PasswordInputField,
  TextInputField,
} from "@/components";
import theme from "@/theme/theme.config";
import { GenerateAlert } from "@/providers/AlertProvider";
import { useMutation } from "@tanstack/react-query";

const SignupPage = () => {
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

  const { mutate, isPending } = useMutation({
    mutationKey: ["singup"],
    mutationFn: (data: SignupFormInitialValuesT) =>
      apiClient({
        method: "POST",
        url: "auth/signup",
        data,
      }),
    onSuccess: ({ data }) => {
      const token = data?.data?.token;
      if (token) {
        GenerateAlert.onSuccess(data?.message);
        router.push(`/verify-email?token=${token}`);
      }
    },
  });

  const onSubmit: SubmitHandler<SignupFormInitialValuesT> = async (
    data: SignupFormInitialValuesT
  ) => mutate(data);

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
      <FormSubmitButton disabled={!isValid} isPending={isPending}>
        Submit
      </FormSubmitButton>
      <NavLink href={"/login"} prefetch>
        Already have an account? Login
      </NavLink>
    </Box>
  );
};

export default SignupPage;
