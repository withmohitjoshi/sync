"use client";
import { AppRouterPagePropsT } from "@/helpers/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ResetPasswordFormInitialValuesT } from "./types";
import { initialValues, resetPasswordSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@/lib/interceptor";
import { FormSubmitButton, PasswordInputField } from "@/components";
import { Box, Typography } from "@mui/material";
import theme from "@/theme/theme.config";
import { GenerateAlert } from "@/providers/AlertContext";

const ResetPassword = ({ searchParams }: AppRouterPagePropsT) => {
  const token = searchParams?.token || "";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormInitialValuesT) => {
    if (token) {
      setIsSubmitting(true);
      const response = await apiClient({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        url: "auth/reset-password",
        data,
      });
      if (response.status === 200) {
        new GenerateAlert({
          message: response.data?.message,
        });
        router.replace("/login");
      }
      setIsSubmitting(false);
    }
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
      <Typography variant="h2">Reset Password</Typography>
      <PasswordInputField
        {...register("newPassword")}
        error={errors.newPassword?.message}
        label="New Password"
        placeholder="Enter your new Password"
      />
      <FormSubmitButton disabled={!isValid || !token} isPending={isSubmitting}>
        Submit
      </FormSubmitButton>
    </Box>
  );
};

export default ResetPassword;
