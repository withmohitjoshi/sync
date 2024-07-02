"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { initialValues, verifyEmailSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyEmailFormInitialValuesT } from "./types";

const VerifyEmailPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<VerifyEmailFormInitialValuesT>({
    defaultValues: initialValues,
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit: SubmitHandler<VerifyEmailFormInitialValuesT> = async (
    data: VerifyEmailFormInitialValuesT
  ) => {
    // await apiClient({
    //   method: "POST",
    //   url: "auth/verify-code",
    //   data,
    // });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Code</label>
      <input {...register("code")} type="text" />
      <button
        type="button"
        onClick={async () => {
          //   await apiClient({
          //     method: "POST",
          //     url: `auth/send-code?id=`,
          //   });
        }}
      >
        Resend Email
      </button>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default VerifyEmailPage;
