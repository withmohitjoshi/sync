"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Spinner } from "@/components/Loaders";
import { GenerateAlert } from "@/providers/AlertContext";

let id: NodeJS.Timeout;
const VerifyEmailPage = ({ searchParams }: AppRouterPagePropsT) => {
  const token = searchParams?.token || "";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResendEmailDisabled, setIsResendEmailDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<VerifyEmailFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(verifyEmailSchema),
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

  const onSubmit = async (data: VerifyEmailFormInitialValuesT) => {
    if (token) {
      setIsSubmitting(true);
      const response = await apiClient({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        url: "auth/verify-email",
        data,
      });
      if (response.status === 200) {
        new GenerateAlert({
          message: response.data?.message,
        });
        router.replace("/login");
      }
      setIsSubmitting(false);
    }
  };

  const onResendEmail = async () => {
    if (isResendEmailDisabled === false) {
      setIsResendEmailDisabled(true);
      const timer = document.getElementById("timer");
      if (timer) timer.textContent = "60";
      const resp = await resendVerifyEmail(token);
      const newToken = resp?.data?.token;
      new GenerateAlert({
        message: resp?.message!,
      });
      if (newToken) {
        router.push(`/verify-email?token=${newToken}`);
      } else {
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
      <FormSubmitButton disabled={!isValid || !token} isPending={isSubmitting}>
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
