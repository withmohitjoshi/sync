"use client";
import useFormHook from "../../../../hook/useFormHook";
import {
  changeUsernameSchema,
  changeUsernameInitialValues,
} from "../../myaccount/constants";
import LoadingButton from "../../../../components/Button/LoadingButton";
import TextInput from "../../../../components/Input/TextInput";
import { Controller } from "react-hook-form";
import { Toaster } from "../../../../helpers/toaster";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../../lib/interceptor";
import React, { useEffect } from "react";
import { dispatchRefetchQuery } from "../../../../helpers/events";
import { USERNAME_MAX_LENGTH } from "@/helpers/constants";

const ChangeUsername = ({ username = "" }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useFormHook(changeUsernameInitialValues, changeUsernameSchema);

  const { mutate, isPending } = useMutation({
    mutationKey: ["change-username"],
    mutationFn: (data) =>
      apiClient({
        method: "PUT",
        url: "user/change-username",
        data,
      }),
    onSuccess: ({ data }) => {
      Toaster.success(data?.message);
      dispatchRefetchQuery("get-details");
    },
  });

  useEffect(() => {
    if (username)
      reset({
        username,
      });
  }, [reset, username]);

  const onSubmit = (data) => isDirty && mutate(data);

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextInput
              placeholder="Username"
              error={errors.username?.message}
              maxLength={USERNAME_MAX_LENGTH}
              {...field}
            />
          )}
        />
        <LoadingButton
          text="Change"
          type="submit"
          isLoading={isPending}
          disabled={!isDirty}
        />
      </form>
    </div>
  );
};

export default React.memo(ChangeUsername);
