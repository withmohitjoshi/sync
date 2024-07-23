import { default as MuiButton } from "@mui/material/Button";

export const Button = ({ children, type = "button", disabled }: any) => {
  return (
    <>
      <MuiButton fullWidth variant="contained" {...{ type, disabled }}>
        {children}
      </MuiButton>
    </>
  );
};
