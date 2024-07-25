'use client';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type PasswordInputFieldFnPropsT = Omit<TextFieldProps, "type" | "error"> & {
  error?: string;
};

const PasswordInputFieldFn = (
  { label, error, ...rest }: PasswordInputFieldFnPropsT,
  ref: any
) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      fullWidth
      ref={ref}
      type={showPassword ? "text" : "password"}
      {...{
        label,
        error: Boolean(error),
        helperText: error,
        multiline: false,
        ...rest,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export const PasswordInputField = forwardRef(PasswordInputFieldFn);
