import { TextField } from "@mui/material";
import { forwardRef } from "react";

const TextInputFieldFn = (
  { type = "text", label, error, ...rest }: any,
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
