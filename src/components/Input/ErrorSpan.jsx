import React from "react";

const ErrorSpan = ({ error }) => {
  return (
    error && <span className="error-span text-red-700 text-sm">{error}</span>
  );
};

export default ErrorSpan;
