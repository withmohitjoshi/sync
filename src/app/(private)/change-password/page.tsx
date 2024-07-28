"use client";
import { BoxLayout, FormSubmitButton, PasswordInputField } from "@/components";
import { changePasswordSchema, initialValues } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangePasswordInitialValuesT } from "./types";
import { Box, Typography } from "@mui/material";
import theme from "@/theme/theme.config";
import { apiClient } from "@/lib/interceptor";
import { GenerateAlert } from "@/providers/AlertProvider";
import { useMutation } from "@tanstack/react-query";

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(changePasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: (data: ChangePasswordInitialValuesT) =>
      apiClient({
        method: "PUT",
        url: "user/change-password",
        data,
      }),
    onSuccess: ({ data }) => GenerateAlert.onSuccess(data?.message),
  });

  const onSubmit: SubmitHandler<ChangePasswordInitialValuesT> = async (
    data: ChangePasswordInitialValuesT
  ) => mutate(data);

  return (
    <BoxLayout>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(4),
        }}
      >
        <Typography variant="h2">Change Password</Typography>
        <PasswordInputField
          {...register("oldPassword")}
          error={errors.oldPassword?.message}
          label="Old Password"
          placeholder="Enter your old Password"
        />
        <PasswordInputField
          {...register("newPassword")}
          error={errors.newPassword?.message}
          label="New Password"
          placeholder="Enter your new Password"
        />
        <FormSubmitButton disabled={!isValid} isPending={isPending}>
          Submit
        </FormSubmitButton>
      </Box>
    </BoxLayout>
  );
};

export default ChangePasswordPage;
