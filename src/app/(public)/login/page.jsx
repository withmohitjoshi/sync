"use client";
import EmailInput from "../../../components/Input/EmailInput";
import PasswordInput from "../../../components/Input/PasswordInput";
import NavigateLink from "../../../components/Link/NavigateLink";
import MiddleBox from "../../../components/Layouts/MiddleBox";
import { Controller } from "react-hook-form";
import useFormHook from "../../../hook/useFormHook";
import { initialValues, schema } from "./constants";
import { Toaster } from "../../../helpers/toaster";
import LoadingButton from "../../../components/Button/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../lib/interceptor";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormHook(initialValues, schema);

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data) =>
      apiClient({
        method: "POST",
        url: "auth/login",
        data,
      }),
    onSuccess: ({ data }) => {
      const token = data?.data?.token;
      if (token) {
        Toaster.success(data?.message);
        router.push(`/verify-email?token=${token}`);
      } else if (data.status === 200) {
        router.replace(`/`);
      }
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <MiddleBox headingName={"Login"}>
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
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <PasswordInput
              placeholder="Password"
              error={errors.password?.message}
              {...field}
            />
          )}
        />
        <NavigateLink text={"Forgot Password?"} href={"/forgot-password"} />
        <LoadingButton text="Submit" type="submit" isLoading={isPending} />
        <div className="text-sm text-center text-gray-400">
          {"Don't have an account? "}
          <NavigateLink text={"SignUp"} href={"/signup"} />
        </div>
      </form>
    </MiddleBox>
  );
};

export default LoginPage;
