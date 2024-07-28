"use client";
import { FormSubmitButton, TextInputField } from "@/components";
import theme from "@/theme/theme.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { changeUsernameSchema, initialValues } from "../constants";
import { ChangeUsernameInitialValuesT } from "../types";
import { apiClient } from "@/lib/interceptor";
import { GenerateAlert } from "@/providers/AlertProvider";
import { useMutation } from "@tanstack/react-query";
import { dispatchRefetchQuery } from "@/helpers/customevents";

export const ChangeUsername = ({ username }: { username: string }) => {
  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(changeUsernameSchema),
    mode: "onTouched",
    reValidateMode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-username"],
    mutationFn: (data: ChangeUsernameInitialValuesT) =>
      apiClient({
        method: "PUT",
        url: "user/update-username",
        data,
      }),
    onSuccess: ({ data }) => {
      GenerateAlert.onSuccess(data?.message);
      dispatchRefetchQuery("get-user-details");
    },
  });

  useEffect(() => {
    if (username) {
      reset({ username });
    }
  }, [reset, username]);

  const onSubmit: SubmitHandler<ChangeUsernameInitialValuesT> = async (
    data: ChangeUsernameInitialValuesT
  ) => mutate(data);

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
      <FormSubmitButton
        disabled={!isValid || watch("username") === username}
        isPending={isPending}
      >
        Change
      </FormSubmitButton>
    </Box>
  );
};
