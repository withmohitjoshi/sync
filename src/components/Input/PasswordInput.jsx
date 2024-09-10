import React, { forwardRef, useState } from "react";
import ErrorSpan from "./ErrorSpan";
import LabelTag from "./LabelTag";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ label, error, ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full">
      <button
        type="button"
        className="absolute flex items-center text-gray-400 right-4 top-[10px]"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={"20"} /> : <Eye size={"20"} />}
      </button>
      <LabelTag label={label} />
      <input
        type={showPassword ? "text" : "password"}
        className="block w-full px-3 py-2 text-gray-100 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
        ref={ref}
        {...rest}
      />
      <ErrorSpan error={error} />
    </div>
  );
};

export default forwardRef(PasswordInput);
