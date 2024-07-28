"use client";
import { forgotPasswordSchema, initialValues } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormInitialValuesT } from "./types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import theme from "@/theme/theme.config";
import { FormSubmitButton, NavLink, TextInputField } from "@/components";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/interceptor";
import { GenerateAlert } from "@/providers/AlertProvider";
import { useMutation } from "@tanstack/react-query";

const ForgotPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    reValidateMode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: (data: ForgotPasswordFormInitialValuesT) =>
      apiClient({
        method: "POST",
        url: "auth/forgot-password",
        data,
      }),
    onSuccess: ({ data }) => {
      if (data.status === 200) {
        new GenerateAlert({
          message: data?.message,
        });
        router.replace("/login");
      }
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormInitialValuesT> = async (
    data: ForgotPasswordFormInitialValuesT
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
      <Typography variant="h2">Forgot Password</Typography>
      <Box display={"flex"} alignItems={"end"} flexDirection={"column"}>
        <TextInputField
          {...register("email")}
          error={errors.email?.message}
          label="Email"
          placeholder="Enter your email"
          type="email"
        />
        <NavLink href={"/login"} prefetch>
          Back to Login
        </NavLink>
      </Box>
      <FormSubmitButton disabled={!isValid} isPending={isPending}>
        Submit
      </FormSubmitButton>
    </Box>
  );
};

export default ForgotPassword;
