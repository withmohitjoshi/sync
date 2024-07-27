"use client";
import { FormSubmitButton, TextInputField } from "@/components";
import theme from "@/theme/theme.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { changeUsernameSchema, initialValues } from "../constants";
import { ChangeUsernameInitialValuesT } from "../types";
import { apiClient } from "@/lib/interceptor";
import { GenerateAlert } from "@/providers/AlertContext";

export const ChangeUsername = ({ username }: { username: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(changeUsernameSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (username) {
      reset({ username });
    }
  }, [reset, username]);

  const onSubmit: SubmitHandler<ChangeUsernameInitialValuesT> = async (
    data: ChangeUsernameInitialValuesT
  ) => {
    setIsSubmitting(true);
    const response = await apiClient({
      method: "PUT",
      url: "user/update-username",
      data,
    });
    if (response.status === 200) {
      new GenerateAlert({
        message: response.data?.message,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
      }}
    >
      <TextInputField
        {...register("username")}
        error={errors.username?.message}
        placeholder="Enter a username"
        type="text"
      />
      <FormSubmitButton disabled={!isValid} isPending={isSubmitting}>
        Change
      </FormSubmitButton>
    </Box>
  );
};
