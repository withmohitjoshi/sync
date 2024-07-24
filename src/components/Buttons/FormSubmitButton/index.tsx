import { ButtonProps, default as MuiButton } from "@mui/material/Button";
import { ButtonLoader } from "@/components";

type FormSubmitButtonT = ButtonProps & {
  isPending: boolean;
  LoadingComponent?: () => JSX.Element;
};

export const FormSubmitButton = ({
  children,
  disabled,
  isPending,
  LoadingComponent = () => <ButtonLoader />,
  ...rest
}: FormSubmitButtonT) => {
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
