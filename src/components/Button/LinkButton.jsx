import Link from "next/link";
import React from "react";

const LinkButton = ({ href, children, extraClasses = "", ...rest }) => {
  return (
    <Link href={href}>
      <button
        className={`${extraClasses} flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-100 bg-gray-600 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none text-nowrap`}
        {...rest}
      >
        {children}
      </button>
    </Link>
  );
};

export default LinkButton;
