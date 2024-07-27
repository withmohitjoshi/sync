"use client";
import { BoxLayout, FormSubmitButton, PasswordInputField } from "@/components";
import { useState } from "react";
import { changePasswordSchema, initialValues } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangePasswordInitialValuesT } from "./types";
import { Box, Typography } from "@mui/material";
import theme from "@/theme/theme.config";

const ChangePasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const onSubmit: SubmitHandler<ChangePasswordInitialValuesT> = async (
    _: ChangePasswordInitialValuesT
  ) => {};

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
        <FormSubmitButton disabled={!isValid} isPending={isSubmitting}>
          Submit
        </FormSubmitButton>
      </Box>
    </BoxLayout>
  );
};

export default ChangePasswordPage;
