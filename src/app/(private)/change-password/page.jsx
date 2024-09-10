"use client";
import MiddleBox from "../../../components/Layouts/MiddleBox";
import { Controller } from "react-hook-form";
import PasswordInput from "../../../components/Input/PasswordInput";
import LoadingButton from "../../../components/Button/LoadingButton";
import useFormHook from "../../../hook/useFormHook";
import { initialValues, schema } from "./constants";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../lib/interceptor";
import { Toaster } from "../../../helpers/toaster";

const ChangePasswordPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormHook(initialValues, schema);

  const { mutate, isPending } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: (data) =>
      apiClient({
        method: "PUT",
        url: "user/change-password",
        data,
      }),
    onSuccess: ({ data }) => Toaster.success(data?.message),
  });

  const onSubmit = (data) => mutate(data);

  return (
    <MiddleBox headingName={"Change Password"} showBackButton>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="oldPassword"
          render={({ field }) => (
            <PasswordInput
              placeholder="Old Password"
              error={errors.oldPassword?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          render={({ field }) => (
            <PasswordInput
              placeholder="New Password"
              error={errors.newPassword?.message}
              {...field}
            />
          )}
        />
        <LoadingButton text="Submit" type="submit" isLoading={isPending} />
      </form>
    </MiddleBox>
  );
};

export default ChangePasswordPage;
