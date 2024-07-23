import { IconButton, InputAdornment, TextField } from "@mui/material";
import { forwardRef, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const PasswordInputFieldFn = ({ label, error, ...rest }: any, ref: any) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      fullWidth
      ref={ref}
      type={showPassword ? "text" : "password"}
      {...{
        label,
        error: Boolean(error),
        helperText: error,
        multiline: false,
        ...rest,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={()=>setShowPassword(prev => !prev)}>
              {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
export const PasswordInputField = forwardRef(PasswordInputFieldFn);
