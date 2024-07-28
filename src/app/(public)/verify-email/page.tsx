"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { initialValues, verifyEmailSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyEmailFormInitialValuesT } from "./types";
import { apiClient } from "@/lib/interceptor";
import { useRouter } from "next/navigation";
import { AppRouterPagePropsT } from "@/helpers/types";
import { resendVerifyEmail } from "./actions";
import { alpha, Box, Typography } from "@mui/material";
import { FormSubmitButton, NumberInputField } from "@/components";
import { grey } from "@mui/material/colors";
import theme from "@/theme/theme.config";
import { Spinner } from "@/components";
import { GenerateAlert } from "@/providers/AlertProvider";
import { useMutation } from "@tanstack/react-query";

let id: NodeJS.Timeout;
const VerifyEmailPage = ({ searchParams }: AppRouterPagePropsT) => {
  const token = searchParams?.token || "";
  const router = useRouter();
  const [isResendEmailDisabled, setIsResendEmailDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<VerifyEmailFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(verifyEmailSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["verify-email"],
    mutationFn: (data: VerifyEmailFormInitialValuesT) =>
      apiClient({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        url: "auth/verify-email",
        data,
      }),
    onSuccess: ({ data }) => {
      GenerateAlert.onSuccess(data?.message);
      router.replace("/login");
    },
  });

  useEffect(() => {
    if (isResendEmailDisabled && token) {
      id = setInterval(() => {
        const timer = document.getElementById("timer");
        if (timer && timer.textContent) {
          const timeLeft = parseInt(timer.textContent);
          if (timeLeft <= 0) {
            setIsResendEmailDisabled(false);
          } else {
            timer.textContent = String(timeLeft - 1);
          }
        }
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [isResendEmailDisabled, token]);

  const onSubmit: SubmitHandler<VerifyEmailFormInitialValuesT> = async (
    data: VerifyEmailFormInitialValuesT
  ) => mutate(data);

  const onResendEmail = async () => {
    if (isResendEmailDisabled === false) {
      setIsResendEmailDisabled(true);
      const timer = document.getElementById("timer");
      if (timer) timer.textContent = "60";
      const resp = await resendVerifyEmail(token);
      const newToken = resp?.data?.token;
      if (newToken) {
        GenerateAlert.onSuccess(resp?.message!);
        router.push(`/verify-email?token=${newToken}`);
      } else {
        GenerateAlert.onError(resp?.message!);
        setIsResendEmailDisabled(false);
      }
    }
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(4),
      }}
    >
      <Typography variant="h2">Verify Email</Typography>
      <NumberInputField
        {...register("code")}
        error={errors.code?.message}
        label="Code"
        placeholder="Enter code"
      />
      <FormSubmitButton disabled={!isValid || !token} isPending={isPending}>
        Submit
      </FormSubmitButton>
      {token && (
        <Typography
          component={"p"}
          variant="body1"
          onClick={onResendEmail}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(0.5),
            cursor: isResendEmailDisabled ? "not-allowed" : "pointer",
            color: isResendEmailDisabled ? alpha(grey[500], 0.5) : "inherit",
          }}
        >
          <span>Resend Email</span>
          {isResendEmailDisabled && (
            <>
              {"after "}
              <span id="timer">60</span>
              {" sec"}
              <Spinner
                disableShrink
                color="secondary"
                size={"1rem"}
                thickness={4}
              />
            </>
          )}
        </Typography>
      )}
    </Box>
  );
};

export default VerifyEmailPage;
