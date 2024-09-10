"use client";
import EmailInput from "../../../components/Input/EmailInput";
import TextInput from "../../../components/Input/TextInput";
import PasswordInput from "../../../components/Input/PasswordInput";
import LoadingButton from "../../../components/Button/LoadingButton";
import NavigateLink from "../../../components/Link/NavigateLink";
import MiddleBox from "../../../components/Layouts/MiddleBox";
import { Controller } from "react-hook-form";
import useFormHook from "../../../hook/useFormHook";
import { initialValues, schema } from "./constants";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../lib/interceptor";
import { useRouter } from "next/navigation";
import { Toaster } from "../../../helpers/toaster";

const SignupPage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormHook(initialValues, schema);

  const { mutate, isPending } = useMutation({
    mutationKey: ["singup"],
    mutationFn: (data) =>
      apiClient({
        method: "POST",
        url: "auth/signup",
        data,
      }),
    onSuccess: ({ data }) => {
      const token = data?.data?.token;
      if (token) {
        Toaster.success(data?.message);
        router.push(`/verify-email?token=${token}`);
      }
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <MiddleBox headingName={"Signup"}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextInput
              placeholder="Username"
              error={errors.username?.message}
              {...field}
            />
          )}
        />
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
        <LoadingButton
          text="Submit"
          type="submit"
          isLoading={isPending}
        />
        <div className="text-sm text-center text-gray-400">
          {"Already have an account? "}
          <NavigateLink text={"Login"} href={"/login"} />
        </div>
      </form>
    </MiddleBox>
  );
};

export default SignupPage;
