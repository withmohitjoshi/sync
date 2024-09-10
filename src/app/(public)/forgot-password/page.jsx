"use client";
import EmailInput from "../../../components/Input/EmailInput";
import SimpleButton from "../../../components/Button/SimpleButton";
import NavigateLink from "../../../components/Link/NavigateLink";
import MiddleBox from "../../../components/Layouts/MiddleBox";
import { Controller } from "react-hook-form";
import useFormHook from "../../../hook/useFormHook";
import { initialValues, schema } from "./constants";
import { useMutation } from "@tanstack/react-query";
import { Toaster } from "../../../helpers/toaster";
import { useRouter } from "next/navigation";
import LoadingButton from "../../../components/Button/LoadingButton";
import { apiClient } from "../../../lib/interceptor";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormHook(initialValues, schema);

  const { mutate, isPending } = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: (data) =>
      apiClient({
        method: "POST",
        url: "auth/forgot-password",
        data,
      }),
    onSuccess: ({ data }) => {
      Toaster.success(data?.message);
      router.replace("/login");
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <MiddleBox headingName={"Forgot Password"}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <EmailInput
              placeholder="Email"
              error={errors.email?.message}
              {...field}
            />
          )}
        />
        <NavigateLink text={"Back to Login"} href={"/login"} />
        <LoadingButton text="Submit" type="submit" isLoading={isPending} />
      </form>
    </MiddleBox>
  );
};

export default ForgotPasswordPage;
