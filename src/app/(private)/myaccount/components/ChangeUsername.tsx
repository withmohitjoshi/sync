"use client";
import { FormSubmitButton, TextInputField } from "@/components";
import theme from "@/theme/theme.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { changeUsernameSchema, initialValues } from "../constants";
import { ChangeUsernameInitialValuesT } from "../types";

export const ChangeUsername = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(changeUsernameSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<ChangeUsernameInitialValuesT> = async (
    _: ChangeUsernameInitialValuesT
  ) => {};

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
        label="Username"
        placeholder="Enter a username"
        type="text"
      />
      <FormSubmitButton disabled={!isValid} isPending={isSubmitting}>
        Change
      </FormSubmitButton>
    </Box>
  );
};
