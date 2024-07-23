import { default as MuiButton } from "@mui/material/Button";

export const Button = ({
  children,
  type = "button",
  disabled,
  ...rest
}: any) => {
  return (
    <>
      <MuiButton fullWidth variant="contained" {...{ type, disabled, ...rest }}>
        {children}
      </MuiButton>
    </>
  );
};
