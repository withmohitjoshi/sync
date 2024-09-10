import React from "react";
import Spinner from "../Loaders/Spinner";

const LoadingButton = ({
  type = "button",
  children,
  text = "Click",
  isLoading = false,
  extraClasses = "",
  spinnerSize = 6,
  ...rest
}) => {
  return (
    <button
      disabled={isLoading}
      type={type}
      className={`flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-100 bg-gray-600 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none text-nowrap disabled:cursor-not-allowed ${extraClasses}`}
      {...rest}
    >
      <span className="flex gap-4 items-center">
        {isLoading && <Spinner size={spinnerSize} />} {children || text}
      </span>
    </button>
  );
};

export default LoadingButton;
