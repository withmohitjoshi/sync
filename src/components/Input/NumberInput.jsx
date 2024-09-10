import React, { forwardRef } from "react";
import ErrorSpan from "./ErrorSpan";
import LabelTag from "./LabelTag";

const NumberInput = ({ label, error, ...rest }, ref) => {
  return (
    <div className="w-full">
      <LabelTag label={label} />
      <input
        type="number"
        className="block w-full px-3 py-2 text-gray-100 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
        ref={ref}
        {...rest}
      />
      <ErrorSpan error={error} />
    </div>
  );
};

export default forwardRef(NumberInput);
