"use client";
import PasswordInput from "../../../components/Input/PasswordInput";
import MiddleBox from "../../../components/Layouts/MiddleBox";
import { Controller } from "react-hook-form";
import useFormHook from "../../../hook/useFormHook";
import { initialValues, schema } from "./constants";
import { useMutation } from "@tanstack/react-query";
import LoadingButton from "../../../components/Button/LoadingButton";
import { apiClient } from "../../../lib/interceptor";
import { Toaster } from "../../../helpers/toaster";
import { useRouter } from "next/navigation";

const ResetPasswordPage = ({ searchParams }) => {
  const token = searchParams?.token || "";
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormHook(initialValues, schema);

  const { mutate, isPending } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (data) =>
      apiClient({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        url: "auth/reset-password",
        data,
      }),
    onSuccess: ({ data }) => {
      Toaster.success(data?.message);
      router.replace("/login");
    },
  });
  const onSubmit = (data) => mutate(data);

  return (
    <MiddleBox headingName={"Reset Password"}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

export default ResetPasswordPage;
