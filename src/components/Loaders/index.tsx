import { CircularProgress, CircularProgressProps } from "@mui/material";

export const ButtonLoader = (props: CircularProgressProps) => {
  return (
      <CircularProgress
        variant="indeterminate"
        thickness={2}
        size={25}
        {...props}
      />
  );
};

export const Spinner = (props: CircularProgressProps) => {
  return <CircularProgress variant="indeterminate" thickness={4} disableShrink {...props} />;
};
