import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

type NumberInputFieldFnPropsT = Omit<TextFieldProps, "type" | "error"> & {
  error?: string;
};

const NumberInputFieldFn = (
  { label, error, ...rest }: NumberInputFieldFnPropsT,
  ref: any
) => {
  return (
    <TextField
      type="number"
      fullWidth
      ref={ref}
      {...{
        label,
        error: Boolean(error),
        helperText: error,
        multiline: false,
        ...rest,
      }}
    />
  );
};

export const NumberInputField = forwardRef(NumberInputFieldFn);
