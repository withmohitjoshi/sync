import { TextField } from "@mui/material";
import { forwardRef } from "react";

const NumberInputFieldFn = (
  { type = "text", label, error, ...rest }: any,
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
