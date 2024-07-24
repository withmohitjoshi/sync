import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

type TextInputFieldFnPropsT = Omit<TextFieldProps, "error"> & {
  error?: string;
};

const TextInputFieldFn = (
  { type = "text", label, error, ...rest }: TextInputFieldFnPropsT,
  ref: any
) => {
  return (
    <TextField
      fullWidth
      ref={ref}
      {...{
        label,
        type,
        error: Boolean(error),
        helperText: error,
        multiline: false,
        ...rest,
      }}
    />
  );
};
export const TextInputField = forwardRef(TextInputFieldFn);
