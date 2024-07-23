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
import { alpha, Box, CircularProgress, Typography } from "@mui/material";
import {
  Button,
  FormSubmitButton,
  NumberInputField,
  TextInputField,
} from "@/components";
import { grey } from "@mui/material/colors";

let id: NodeJS.Timeout;
const VerifyEmailPage = ({ searchParams }: AppRouterPagePropsT) => {
  const token = searchParams?.token || "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResendEmailDisabled, setIsResendEmailDisabled] = useState(true);
  const router = useRouter();
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
    try {
      setIsSubmitting(true);
      if (token) {
        const response = await apiClient({
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          url: "auth/verify-email",
          data,
        });
        if (response.status === 200) {
          router.push("/login");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography variant="h2">Verify Email</Typography>
      <NumberInputField
        {...register("code")}
        error={errors.code?.message}
        label="Code"
        placeholder="Enter code"
      />
      <FormSubmitButton disabled={!isValid} isPending={isSubmitting}>
        Submit
      </FormSubmitButton>
      {token && (
        <Typography
          variant="body1"
          color={isResendEmailDisabled ? alpha(grey[500], 0.5) : "inherit"}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: isResendEmailDisabled ? "not-allowed" : "pointer",
          }}
          onClick={async () => {
            if (isResendEmailDisabled === false) {
              setIsResendEmailDisabled(true);
              const timer = document.getElementById("timer");
              if (timer) {
                timer.textContent = "60";
              }
              const resp = await resendVerifyEmail(token);
              if (resp.status === 200) {
                router.push(`/verify-email?token=${resp?.data?.token}`);
              } else {
                setIsResendEmailDisabled(false);
                console.error({ resp });
              }
            }
          }}
        >
          {isResendEmailDisabled && (
            <CircularProgress disableShrink color="secondary" size={20} />
          )}
          Resend Email
          {isResendEmailDisabled ? (
            <>
              {" in "}
              <span id="timer">60</span>
              {" sec"}
            </>
          ) : (
            <></>
          )}
        </Typography>
      )}
    </Box>
  );
};

export default VerifyEmailPage;
