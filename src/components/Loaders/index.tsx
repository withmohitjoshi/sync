import { CircularProgress, CircularProgressProps, LinearProgress, LinearProgressProps } from "@mui/material";

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
  return (
    <CircularProgress
      variant="indeterminate"
      thickness={4}
      disableShrink
      {...props}
    />
  );
};

export const LinearLoader = (props: LinearProgressProps) => {
  return <LinearProgress color="secondary" {...props} />;
};
