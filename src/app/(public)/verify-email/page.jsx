"use client";
import NumberInput from "../../../components/Input/NumberInput";
import MiddleBox from "../../../components/Layouts/MiddleBox";
import { Controller } from "react-hook-form";
import useFormHook from "../../../hook/useFormHook";
import { initialValues, schema } from "./constants";
import { useRouter } from "next/navigation";
import { apiClient } from "../../../lib/interceptor";
import { Toaster } from "../../../helpers/toaster";
import LoadingButton from "../../../components/Button/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { resendVerifyEmail } from "./action";

const VerifyEmailPage = ({ searchParams }) => {
  const token = searchParams?.token || "";
  const router = useRouter();
  const [isResendEmailDisabled, setIsResendEmailDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormHook(initialValues, schema);

  const { mutate, isPending } = useMutation({
    mutationKey: ["verify-email"],
    mutationFn: (data) =>
      apiClient({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        url: "auth/verify-email",
        data,
      }),
    onSuccess: ({ data }) => {
      Toaster.success(data?.message);
      router.replace("/login");
    },
  });

  useEffect(() => {
    let id;
    if (isResendEmailDisabled && token) {
      const timer = document.getElementById("timer");
      const startTime = Date.now();
      id = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = 120000 - elapsedTime;
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
        timer.innerText = formattedTime;
        if (remainingTime <= 0) {
          clearInterval(id);
          setIsResendEmailDisabled(false);
        }
      }, 1000);
    }
    return () => clearInterval(id);
  }, [isResendEmailDisabled, token]);

  const onSubmit = (data) => mutate(data);

  return (
    <MiddleBox headingName={"Verify Email"}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <NumberInput
              placeholder="Code"
              error={errors.code?.message}
              {...field}
            />
          )}
        />
        <LoadingButton text="Submit" type="submit" isLoading={isPending} />
        {token &&
          (isResendEmailDisabled ? (
            <div className="block text-gray-400 cursor-default">
              Resend Email in <span id="timer">02:00</span>
            </div>
          ) : (
            <div
              className="inline-block text-gray-100 cursor-pointer"
              onClick={async () => {
                const res = await resendVerifyEmail(token);
                const newToken = res?.data?.token;
                if (newToken) {
                  Toaster.success(res?.message);
                  setIsResendEmailDisabled(true);
                  router.replace(`/verify-email?token=${newToken}`);
                } else {
                  Toaster.error(res?.message);
                  setIsResendEmailDisabled(false);
                }
              }}
            >
              Resend Email?
            </div>
          ))}
      </form>
    </MiddleBox>
  );
};

export default VerifyEmailPage;
