"use client";
import { AppRouterPagePropsT } from "@/helpers/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ResetPasswordFormInitialValuesT } from "./types";
import { initialValues, resetPasswordSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@/lib/interceptor";
import { FormSubmitButton, PasswordInputField } from "@/components";
import { Box, Typography } from "@mui/material";
import theme from "@/theme/theme.config";
import { GenerateAlert } from "@/providers/AlertProvider";
import { useMutation } from "@tanstack/react-query";

const ResetPassword = ({ searchParams }: AppRouterPagePropsT) => {
  const token = searchParams?.token || "";
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (data: ResetPasswordFormInitialValuesT) =>
      apiClient({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        url: "auth/reset-password",
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

  const onSubmit = async (data: ResetPasswordFormInitialValuesT) => {
    if (token) mutate(data);
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
      <FormSubmitButton disabled={!isValid || !token} isPending={isPending}>
        Submit
      </FormSubmitButton>
    </Box>
  );
};

export default ResetPassword;
