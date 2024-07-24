import { default as MuiButton, ButtonProps } from "@mui/material/Button";

export const Button = ({
  children,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <MuiButton fullWidth variant="contained" {...{ type, disabled, ...rest }}>
      {children}
    </MuiButton>
  );
};
