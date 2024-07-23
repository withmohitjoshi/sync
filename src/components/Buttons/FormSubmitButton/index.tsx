import { default as MuiButton } from "@mui/material/Button";
import { ButtonLoader } from "../Loaders/ButtonLoader";

export const FormSubmitButton = ({
  children,
  disabled,
  isPending,
  LoadingComponent = () => <ButtonLoader />,
  ...rest
}: any) => {
  return (
    <MuiButton
      fullWidth
      variant="contained"
      {...{ disabled: disabled || isPending, ...rest }}
      type="submit"
    >
      {isPending ? <LoadingComponent /> : children}
    </MuiButton>
  );
};
