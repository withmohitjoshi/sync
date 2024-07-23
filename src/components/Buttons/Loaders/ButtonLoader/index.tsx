import { Box, CircularProgress, CircularProgressProps } from "@mui/material";

export const ButtonLoader = (props: CircularProgressProps) => {
  return <CircularProgress variant="indeterminate" thickness={2} {...props} />;
};
